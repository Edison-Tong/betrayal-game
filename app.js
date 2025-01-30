import tiles from "./tiles.js";
import playerInfo from "./playerInfo.js";

let boards = document.querySelectorAll(".board");
let dice = document.querySelectorAll(".die");
let totalDisplay = document.querySelector(".total-display");
let rollBtn = document.querySelector(".roll-btn");
let lvl_btns = document.querySelectorAll(".level-btn");
let startingTiles = [];
let displayedFloor = document.querySelector(".board.active");
let displayedFloorName = document.querySelector(".board.active").classList[1];
let currentFloorBtn = document.querySelector("#current");
let endTurnBtn = document.querySelector(".endTurnBtn");
let playerCount = 3;
let players = [];
let activePlayer;
let playerTurnCounter = 0;

let laundryChute;
let secretStaircase;
let isRotating = false;
let movingToTile;
let usedTiles = [];
let direction;
let tileMessageBox = document.querySelector(".tile-message");
let symbolFound;
// let movementTiles = {
//   groundFloorStaircase: { data: tiles[3], element: document.querySelector(".ground-floor-staircase") },
//   hallway: { data: tiles[2], element: document.querySelector(".hallway") },
//   upperLanding: { data: tiles[4], element: document.querySelector(".upper-landing") },
//   basementLanding: { data: tiles[0], element: document.querySelector(".basement-landing") },
//   secretStaircase: { data: tiles[38] },
//   gallery: { data: tiles[18] },
//   ballroom: { data: tiles[6] },
//   undergroundCavern: { data: tiles[43] },
//   graveyard: { data: tiles[20] },
// };

let movementTiles = {
  groundFloorStaircase: {
    opposite: "upperLanding",
    connectingFloor: "upper",
    data: tiles[3],
    element: document.querySelector(".ground-floor-staircase"),
  },
  hallway: {
    opposite: "secretStaircase",
    connectingFloor: "basement",
    data: tiles[2],
    element: document.querySelector(".hallway"),
  },
  upperLanding: {
    opposite: "groundFloorStaircase",
    connectingFloor: "ground",
    data: tiles[4],
    element: document.querySelector(".upper-landing"),
  },
  basementLanding: {
    opposite: "laundryChute",
    connectingFloor: "ground",
    data: tiles[0],
    element: document.querySelector(".basement-landing"),
  },
  secretStaircase: {
    opposite: "hallway",
    connectingFloor: "ground",
    data: tiles[11],
  },
  gallery: { oppoite: "ballroom", connectingFloor: "ground", data: tiles[8] },
  ballroom: { opposite: "gallery", connectingFloor: "upper", data: tiles[5] },
  undergroundCavern: {
    opposite: "graveyard",
    connectingFloor: "ground",
    data: tiles[12],
  },
  graveyard: {
    opposite: "undergroundCavern",
    connectingFloor: "basement",
    data: tiles[9],
  },
};

let endOfTurnTiles = {
  laundryChute: {
    data: tiles[10],
    effect: () => {
      switchBoards("basement");
      positionPlayers("mid", "basement", [
        movementTiles.basementLanding.element.style.gridRow,
        movementTiles.basementLanding.element.style.gridColumn,
      ]);
      activePlayer.currentFloor = "basement";
      activePlayer.currentTile = tiles[0];
    },
  },
  collapsedRoom: {
    data: tiles[6],
    effect: async () => {
      let roll = await handleDiceRoll(activePlayer.stats.speed);
      if (roll >= 5) {
        console.log("You escaped the collapsed room!");
      } else {
        console.log("You failed to escape the collapsed room!");
        switchBoards("basement");
        positionPlayers("mid", "basement", [
          movementTiles.basementLanding.element.style.gridRow,
          movementTiles.basementLanding.element.style.gridColumn,
        ]);
        activePlayer.currentFloor = "basement";
        activePlayer.currentTile = tiles[0];
      }
    },
  },
  furnaceRoom: {
    data: tiles[7],
    effect: async () => {
      console.log("take one DIE of damage");
      let roll = await handleDiceRoll(1);
      let damage = await handleTraitChange("physical", roll);
    },
  },
};

// document.addEventListener("keydown", handlePlayerMovement);
endTurnBtn.addEventListener("click", handleEndOfTurn);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement.tagName === "BUTTON") {
    event.preventDefault();
  }
  switchBoards(activePlayer.currentFloor);
  handlePlayerMovement();
});

let doorAlignments = {
  top: "bottom",
  bottom: "top",
  right: "left",
  left: "right",
};

let doorsRotateRight = {
  top: "right",
  bottom: "left",
  right: "bottom",
  left: "top",
};

let doorsRotateLeft = {
  top: "left",
  bottom: "right",
  right: "top",
  left: "bottom",
};

boards.forEach((board) => {
  board.style.gridTemplateRows = "repeat(3 ,1fr)";
  board.style.gridTemplateColumns = "repeat(3 ,1fr)";
});

let boardSize = {
  basement: { totalRows: 3, totalColumns: 3 },
  ground: { totalRows: 3, totalColumns: 3 },
  upper: { totalRows: 3, totalColumns: 3 },
};

function handleBoardExpanding(direction) {
  if (direction === "left" || direction === "right") {
    boardSize[displayedFloorName].totalColumns += 1;
    displayedFloor.style.gridTemplateColumns = `repeat(${boardSize[displayedFloorName].totalColumns}, 1fr)`;
  } else if (direction === "top" || direction === "bottom") {
    boardSize[displayedFloorName].totalRows += 1;
    displayedFloor.style.gridTemplateRows = `repeat(${boardSize[displayedFloorName].totalRows}, 1fr)`;
  }
  if (direction === "top") {
    Array.from(displayedFloor.children).forEach((child) => {
      let newRow = parseInt(child.style.gridRow);
      newRow += 1;
      child.style.gridRow = newRow;
    });
    activePlayer.marker.style.gridRow = parseInt(activePlayer.marker.style.gridRow) - 1;
  } else if (direction === "left") {
    Array.from(displayedFloor.children).forEach((child) => {
      let newColumn = parseInt(child.style.gridColumn);
      newColumn += 1;
      child.style.gridColumn = newColumn;
    });
    activePlayer.marker.style.gridColumn = parseInt(activePlayer.marker.style.gridColumn) - 1;
  }
}

function makeButtonsActive() {
  lvl_btns.forEach((button) => {
    if (!button.getAttribute("id", "current"))
      button.addEventListener("click", () => {
        switchBoards(button.classList[1].replace("-btn", ""));
      });
  });
}

function switchBoards(targetFloor) {
  currentFloorBtn.setAttribute("id", "");
  currentFloorBtn = document.querySelector(`.${targetFloor}-btn`);
  currentFloorBtn.setAttribute("id", "current");
  currentFloorBtn.removeEventListener("click", switchBoards);
  makeButtonsActive();

  displayedFloor.classList.remove("active");
  document.querySelector(`.${targetFloor}`).classList.add("active");
  displayedFloor = document.querySelector(".board.active");
}

function positionStartingTiles() {
  tiles.forEach((tile) => {
    if (tile.type === "starting") {
      startingTiles.push(tile);
      usedTiles.push(tile);
    }
  });
  let initTiles = document.querySelectorAll(".tile.start");
  initTiles.forEach((tile, i) => {
    tile.style.backgroundImage = `url(./images/${tiles[i].image})`;
    tile.style.gridRow = tiles[i].row;
    tile.style.gridColumn = tiles[i].col;
  });
}

function positionPlayers(time, floor, rowCol) {
  if (time === "start") {
    for (let i = 0; i < playerCount; i++) {
      let player = {
        id: `p${i}`,
        name: playerInfo[i].name,
        currentFloor: floor,
        currentTile: tiles[1],
        marker: document.createElement("div"),
        markerColor: playerInfo[i].color,
        stats: {
          speed: playerInfo[i].stats.speed.slider[playerInfo[i].stats.speed.index],
          might: playerInfo[i].stats.might.slider[playerInfo[i].stats.might.index],
          knowledge: playerInfo[i].stats.knowledge.slider[playerInfo[i].stats.knowledge.index],
          sanity: playerInfo[i].stats.sanity.slider[playerInfo[i].stats.sanity.index],
        },
        movesThisTurn: 0,
        row: rowCol[0],
        col: rowCol[1],
      };

      player.marker.classList.add("player");
      player.marker.setAttribute("id", player.id);
      player.marker.innerHTML = player.name;
      player.marker.style.backgroundColor = player.markerColor;
      player.marker.style.gridRow = 3;
      player.marker.style.gridColumn = 2;
      document.querySelector(".board.ground").append(player.marker);
      players.push(player);
    }
    activePlayer = players[playerTurnCounter];
    return;
  }
  activePlayer.marker.remove();
  activePlayer.currentFloor = floor;
  activePlayer.marker.style.gridRow = rowCol[0];
  activePlayer.marker.style.gridColumn = rowCol[1];
  displayedFloor.append(activePlayer.marker);
}

function renderPlayerStats() {
  document.querySelector("#player-name").innerHTML = activePlayer.name;
  document.querySelector("#player-speed").innerHTML = activePlayer.stats.speed;
  document.querySelector("#player-might").innerHTML = activePlayer.stats.might;
  document.querySelector("#player-knowledge").innerHTML = activePlayer.stats.knowledge;
  document.querySelector("#player-sanity").innerHTML = activePlayer.stats.sanity;
}

async function handlePlayerMovement() {
  // || activePlayer.stats.speed === activePlayer.movesThisTurn || symbolFound
  if (isRotating) {
    return;
  }
  let key = event.key;
  let row;
  let column;
  if (displayedFloor.classList.contains(activePlayer.currentFloor)) {
    row = parseInt(activePlayer.marker.style.gridRow);
    column = parseInt(activePlayer.marker.style.gridColumn);
    if (key === "ArrowUp") {
      direction = "top";
      row -= 1;
    } else if (key === "ArrowRight") {
      direction = "right";
      column += 1;
    } else if (key === "ArrowDown") {
      direction = "bottom";
      row += 1;
    } else if (key === "ArrowLeft") {
      direction = "left";
      column -= 1;
    } else if (key === "Enter") {
      handlePlayerMovesTiles(activePlayer.currentTile.name.replaceAll(" ", ""));
      column = activePlayer.currentTile.col;
      row = activePlayer.currentTile.row;
    }
  }

  if (!activePlayer.currentTile.doors.some((door) => door === direction)) {
    return;
  }
  let existingTile = Array.from(displayedFloor.children).find((child) => {
    return (
      child.classList.contains("tile") &&
      parseInt(child.style.gridColumn) === column &&
      parseInt(child.style.gridRow) === row
    );
  });

  if (!existingTile) {
    let previousTile = movingToTile;
    movingToTile = getTileData();
    if (movingToTile === undefined) {
      alert("There are no more tiles for this floor");
      movingToTile = previousTile;
      return;
    }
    usedTiles.push(movingToTile);
    if (column === 0) {
      handleBoardExpanding("left");
      column = 1;
    } else if (column > boardSize["ground"].totalColumns) {
      handleBoardExpanding("right");
    } else if (row === 0) {
      handleBoardExpanding("top");
      row = 1;
    } else if (row > boardSize["ground"].totalRows) {
      handleBoardExpanding("bottom");
    }
    if (movingToTile.symbol !== "none") {
      symbolFound = true;
    }
    let newTile = document.createElement("div");
    newTile.classList.add("tile", movingToTile.name.replaceAll(" ", "-").toLowerCase());
    newTile.style.backgroundImage = `url(./images/${movingToTile.image})`;
    newTile.style.gridRow = row;
    newTile.style.gridColumn = column;

    if (newTile.classList.contains("laundry-chute")) {
      laundryChute = newTile;
    } else if (newTile.classList.contains("secret-staircase")) {
      movementTiles.secretStaircase.element = newTile;
    } else if (newTile.classList.contains("ballroom")) {
      movementTiles.ballroom.element = newTile;
    } else if (newTile.classList.contains("graveyard")) {
      movementTiles.graveyard.element = newTile;
    } else if (newTile.classList.contains("underground-cavern")) {
      movementTiles.undergroundCavern.element = newTile;
    }
    newTile.classList.add("highlight");
    displayedFloor.append(newTile);
    endTurnBtn.removeEventListener("click", handleEndOfTurn);

    await handleRotateTile(newTile);
  } else {
    usedTiles.forEach((tile) => {
      if (tile.name.toLowerCase() === existingTile.classList[1].replaceAll("-", " ")) {
        movingToTile = tile;
      }
    });
    if (!checkDoorAlignment()) {
      return;
    }
  }

  activePlayer.movesThisTurn += 1;
  movingToTile.message === "none"
    ? (tileMessageBox.style.display = "none")
    : ((tileMessageBox.style.display = "block"), (tileMessageBox.innerHTML = movingToTile.message));
  activePlayer.currentTile = movingToTile;

  activePlayer.row = row;
  activePlayer.col = column;
  activePlayer.marker.style.gridRow = row;
  activePlayer.marker.style.gridColumn = column;
}

function handleRotateTile(tile) {
  return new Promise((resolve) => {
    isRotating = true;
    let currentRotation = 0;

    // Function to rotate the tile
    function rotateTile(event) {
      if (event.key === "ArrowLeft") {
        currentRotation = (currentRotation - 90) % 360; // Rotate counterclockwise
        tile.style.transform = `rotate(${currentRotation}deg)`;
        updateDoors("left");
      } else if (event.key === "ArrowRight") {
        currentRotation = (currentRotation + 90) % 360; // Rotate clockwise
        tile.style.transform = `rotate(${currentRotation}deg)`;
        updateDoors("right");
      } else if (event.key === "Enter") {
        // Finalize rotation
        if (!checkDoorAlignment()) {
          return;
        }
        document.removeEventListener("keydown", rotateTile); // Remove the event listener
        isRotating = false; // Reset the flag to resume actions
        tile.classList.remove("highlight");
        resolve(); // Resolve the promise to indicate the rotation is done
        endTurnBtn.addEventListener("click", handleEndOfTurn);
      }
    }

    // Add event listener to listen for key presses
    document.addEventListener("keydown", rotateTile);
  });
}

// Update doors based on rotation direction
function updateDoors(direction) {
  let updatedDoors = [];
  let rotationMap = direction === "left" ? doorsRotateLeft : doorsRotateRight;

  // Recalculate the doors based on the rotation
  movingToTile.doors.forEach((door) => {
    updatedDoors.push(rotationMap[door]);
  });

  movingToTile.doors = updatedDoors;
}

function getTileData() {
  let availableTiles = [];
  let usedTile;
  tiles.forEach((tile) => {
    if (tile.floors[displayedFloor.classList[1]] && tile.type === "normal") {
      availableTiles.push(tile);
    }
  });
  if (availableTiles[0] === undefined) {
    return;
  }
  usedTile = availableTiles.splice(Math.floor(Math.random() * availableTiles.length), 1)[0];
  tiles.splice(tiles.indexOf(usedTile), 1);
  return usedTile;
}

function checkDoorAlignment() {
  let allowPassage = false;
  movingToTile.doors.forEach((door) => {
    if (door === doorAlignments[direction]) {
      allowPassage = true;
    }
  });
  return allowPassage;
}

function handlePlayerMovesTiles(tileName) {
  let moveTo = movementTiles[tileName].opposite;
  let floor = movementTiles[tileName].connectingFloor;
  activePlayer.currentTile = movementTiles[moveTo].data;

  switchBoards(floor);
  positionPlayers("mid", floor, [
    movementTiles[moveTo].element.style.gridRow,
    movementTiles[moveTo].element.style.gridColumn,
  ]);
}

async function handleEndOfTurn() {
  endTurnBtn.removeEventListener("click", handleEndOfTurn);
  await handleEndOfTurnEvents();
  activePlayer.movesThisTurn = 0;
  playerTurnCounter++;
  if (playerTurnCounter === playerCount) {
    playerTurnCounter = 0;
  }

  activePlayer = players[playerTurnCounter];
  switchBoards(activePlayer.currentFloor);
  renderPlayerStats();
  symbolFound = false;
  endTurnBtn.addEventListener("click", handleEndOfTurn);
}

function handleEndOfTurnEvents() {
  let promises = [];

  for (let key in endOfTurnTiles) {
    if (activePlayer.currentTile.name.replace(" ", "") === key) {
      let effectPromise = endOfTurnTiles[key].effect();
      if (effectPromise instanceof Promise) {
        promises.push(effectPromise); // Collect async tasks
      }
    }
  }

  return Promise.all(promises); // Ensure all tasks complete
}

async function handleDiceRoll(diceAmount) {
  rollBtn.style.display = "inline";
  totalDisplay.innerHTML = "Rolling...";

  let interval;

  // Show only the specified number of dice
  for (let i = 0; i < dice.length; i++) {
    dice[i].style.display = i < diceAmount ? "inline-block" : "none";
  }

  // Start dice rolling animation
  interval = setInterval(() => {
    for (let i = 0; i < diceAmount; i++) {
      let num = Math.floor(Math.random() * 3); // Random dice roll (0-2)
      dice[i].dataset.value = num; // Store the number for later use
      dice[i].src = `./images/dice/${num}.png`;
    }
  }, 100);

  // Return a Promise that resolves when the dice roll completes
  let total = await new Promise((resolve) => {
    rollBtn.addEventListener(
      "click",
      () => {
        clearInterval(interval);
        rollBtn.style.display = "none";
        let total = 0;

        for (let i = 0; i < diceAmount; i++) {
          total += parseInt(dice[i].dataset.value, 10);
        }

        totalDisplay.innerHTML = `Your roll: ${total}`;
        resolve(total); // Resolve the promise with the computed total
      },
      { once: true }
    ); // Ensure the event fires only once
  });

  return total;
}

function handleTraitChange(type, amount) {
  let buttons = document.querySelectorAll(`.${type} button`);
  buttons.forEach((button) => {
    button.classList.remove("hidden");
  });
}

makeButtonsActive();
positionStartingTiles();
positionPlayers("start", "ground", [3, 2]);
renderPlayerStats();
