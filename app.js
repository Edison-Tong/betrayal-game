import tiles from "./tiles.js";
import playerInfo from "./playerInfo.js";

let boards = document.querySelectorAll(".board");
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
let groundFloorStaircase = document.querySelector(".ground-floor-staircase");
let hallway = document.querySelector(".hallway");
let upperLanding = document.querySelector(".upper-landing");
let basementLanding = document.querySelector(".basement-landing");
let laundryChute;
let secretStaircase;
let isRotating = false;
let movingToTile;
let usedTiles = [];
let direction;
let tileMessageBox = document.querySelector(".tile-message");
let symbolFound;
let movementTiles = {
  groundFloorStaircase: { data: tiles[3], element: document.querySelector(".ground-floor-staircase") },
  hallway: { data: tiles[2], element: document.querySelector(".hallway") },
  upperLanding: { data: tiles[4], element: document.querySelector(".upper-landing") },
  basementLanding: { data: tiles[0], element: document.querySelector(".basement-landing") },
  secretStaircase: { data: tiles[38] },
  gallery: { data: tiles[18] },
  ballroom: { data: tiles[6] },
  undergroundCavern: { data: tiles[43] },
  graveyard: { data: tiles[20] },
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
          speed: playerInfo[i].stats.speed,
          might: playerInfo[i].stats.might,
          knowledge: playerInfo[i].stats.knowledge,
          sanity: playerInfo[i].stats.sanity,
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

function handlePlayerStats() {
  document.querySelector("#player-name").innerHTML = activePlayer.name;
  document.querySelector("#player-speed").innerHTML = activePlayer.stats.speed;
  document.querySelector("#player-might").innerHTML = activePlayer.stats.might;
  document.querySelector("#player-knowledge").innerHTML = activePlayer.stats.knowledge;
  document.querySelector("#player-sanity").innerHTML = activePlayer.stats.sanity;
}

async function handlePlayerMovement() {
  if (isRotating || activePlayer.speed === activePlayer.movesThisTurn || symbolFound) return;
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
      handlePlayerMovesTiles();
      column = activePlayer.currentTile.col;
      row = activePlayer.currentTile.row;
    }
  }

  if (!activePlayer.currentTile.doors.some((door) => door === direction)) {
    return;
  }
  activePlayer.movesThisTurn += 1;
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
    newTile.classList.add("tile", movingToTile.name.replaceAll(" ", "-"));
    newTile.style.backgroundImage = `url(./images/${movingToTile.image})`;
    newTile.style.gridRow = row;
    newTile.style.gridColumn = column;
    if (newTile.classList.contains("laundry-chute")) {
      laundryChute = newTile;
    } else if (newTile.classList.contains("secret-staircase")) {
      movementTiles.secretStaircase.marker = newTile;
    }
    newTile.classList.add("highlight");
    displayedFloor.append(newTile);
    await handleRotateTile(newTile);
  } else {
    usedTiles.forEach((tile) => {
      if (tile.name === existingTile.classList[1].replaceAll("-", " ")) {
        movingToTile = tile;
      }
    });
    if (!checkDoorAlignment()) {
      return;
    }
  }

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

function handlePlayerMovesTiles() {
  // Underground Cavern - (movement) leads to Graveyard
  // Graveyard - (movement) leads to Underground Cavern
  // Gallery - (movement) leads to the ballroom
  if (
    // ground floor staircase
    displayedFloor.classList.contains("ground") &&
    activePlayer.marker.style.gridRow === movementTiles.groundFloorStaircase.element.style.gridRow &&
    activePlayer.marker.style.gridColumn === movementTiles.groundFloorStaircase.element.style.gridColumn
  ) {
    activePlayer.currentTile = movementTiles.upperLanding.data;
    switchBoards("upper");
    positionPlayers("mid", "upper", [
      movementTiles.upperLanding.element.style.gridRow,
      movementTiles.upperLanding.element.style.gridColumn,
    ]);
  } else if (
    //upperlanding
    displayedFloor.classList.contains("upper") &&
    activePlayer.marker.style.gridRow === movementTiles.upperLanding.element.style.gridRow &&
    activePlayer.marker.style.gridColumn === movementTiles.upperLanding.element.style.gridColumn
  ) {
    activePlayer.currentTile = tiles[3];
    switchBoards("ground");
    positionPlayers("mid", "ground", [
      movementTiles.groundFloorStaircase.element.style.gridRow,
      movementTiles.groundFloorStaircase.element.style.gridColumn,
    ]);
  } else if (
    //laundry chute. Move to end turn function eventually
    displayedFloor.classList.contains("ground") &&
    activePlayer.marker.style.gridRow === laundryChute.style.gridRow &&
    activePlayer.marker.style.gridColumn === laundryChute.style.gridColumn
  ) {
    activePlayer.currentTile = tiles[0];
    switchBoards("basement");
    positionPlayers("mid", "basement", [
      parseInt(movementTiles.basementLanding.element.style.gridRow),
      parseInt(movementTiles.basementLanding.element.style.gridColumn),
    ]);
  } else if (
    //secret staircase
    displayedFloor.classList.contains("basement") &&
    activePlayer.marker.style.gridRow === movementTiles.secretStaircase.element.style.gridRow &&
    activePlayer.marker.style.gridColumn === movementTiles.secretStaircase.element.style.gridColumn
  ) {
    activePlayer.currentTile = tiles[2];
    switchBoards("ground");
    positionPlayers("mid", "ground", [parseInt(hallway.style.gridRow), parseInt(hallway.style.gridColumn)]);
  } else if (
    //hallway
    displayedFloor.classList.contains("ground") &&
    activePlayer.marker.style.gridRow === movementTiles.hallway.element.style.gridRow &&
    activePlayer.marker.style.gridColumn === movementTiles.hallway.element.style.gridColumn &&
    secretStaircase !== undefined
  ) {
    activePlayer.currentTile = movementTiles.secretStaircase.data;
    switchBoards("basement");
    positionPlayers("mid", "basement", [
      parseInt(movementTiles.secretStaircase.element.style.gridRow),
      parseInt(movementTiles.secretStaircase.element.style.gridColumn),
    ]);
  }
}

function handleEndOfTurn() {
  activePlayer.movesThisTurn = 0;
  playerTurnCounter++;
  if (playerTurnCounter === playerCount) {
    playerTurnCounter = 0;
  }

  activePlayer = players[playerTurnCounter];
  switchBoards(activePlayer.currentFloor);
  handlePlayerStats();
  symbolFound = false;
}

makeButtonsActive();
positionStartingTiles();
positionPlayers("start", "ground", [3, 2]);
handlePlayerStats();
