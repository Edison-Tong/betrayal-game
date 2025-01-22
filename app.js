import tiles from "./tiles.js";
import playerInfo from "./playerInfo.js"

let boards = document.querySelectorAll(".board");
let lvl_btns = document.querySelectorAll(".level-btn");
let startingTiles = [];
let displayedFloor = document.querySelector(".board.active");
let displayedFloorName = document.querySelector(".board.active").classList[1];
let currentFloorBtn = document.querySelector("#current");
let endTurnBtn = document.querySelector(".endTurnBtn");
let playerCount = 2;
let activePlayer;
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
    activePlayer.position.style.gridRow = parseInt(activePlayer.position.style.gridRow) - 1;
  } else if (direction === "left") {
    Array.from(displayedFloor.children).forEach((child) => {
      let newColumn = parseInt(child.style.gridColumn);
      newColumn += 1;
      child.style.gridColumn = newColumn;
    });
    activePlayer.position.style.gridColumn = parseInt(activePlayer.position.style.gridColumn) - 1;
  }
}

function makeButtonsActive() {
  lvl_btns.forEach((button) => {
    if (!button.getAttribute("id", "current"))
      button.addEventListener("click", () => {
        switchBoards(button.classList[1]);
      });
  });
}

function switchBoards(targetFloor) {
  currentFloorBtn.setAttribute("id", "");
  currentFloorBtn = document.querySelector(`.${targetFloor}`);
  currentFloorBtn.setAttribute("id", "current");
  currentFloorBtn.removeEventListener("click", switchBoards);
  makeButtonsActive();

  displayedFloor.classList.remove("active");
  document.querySelector(`.${targetFloor.replace("-btn", "")}`).classList.add("active");
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

let players = [];

function positionPlayers(time, floor, rowCol) {
  if (time === "start") {
    for (let i = 1; i <= playerCount; i++) {
      let player = {
        id: `${i}`,
        name: `Player${i}`,
        label: `P${i}`,
        currentFloor: floor,
        currentTile: tiles[1],
        position: document.createElement("div"),
        row: 3,
        col: 2,
        speed: 4,
      };

      player.position.classList.add("player");
      player.position.innerHTML = player.label;
      player.position.style.gridRow = 3;
      player.position.style.gridColumn = 2;
      document.querySelector(".board.ground").append(player.position);
      players.push(player);
    }
    activePlayer = players[0];
    return;
  }
  activePlayer.position.remove();
  activePlayer.currentFloor = floor;
  activePlayer.position.style.gridRow = rowCol[0];
  activePlayer.position.style.gridColumn = rowCol[1];
  displayedFloor.append(activePlayer.position);
}

document.addEventListener("keydown", handlePlayerMovement);

async function handlePlayerMovement() {
  if (isRotating) return;
  let key = event.key;
  let row;
  let column;
  if (displayedFloor.classList.contains(activePlayer.currentFloor)) {
    row = parseInt(activePlayer.position.style.gridRow);
    column = parseInt(activePlayer.position.style.gridColumn);
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
      handlePlayerMovesFloors();
      return;
    }
  }

  if (!activePlayer.currentTile.doors.some((door) => door === direction)) {
    return;
  }
  activePlayer.speed -= 1;
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
    let newTile = document.createElement("div");
    newTile.classList.add("tile", movingToTile.name.replaceAll(" ", "-"));
    newTile.style.backgroundImage = `url(./images/${movingToTile.image})`;
    newTile.style.gridRow = row;
    newTile.style.gridColumn = column;
    if (newTile.classList.contains("laundry-chute")) {
      laundryChute = newTile;
    } else if (newTile.classList.contains("secret-staircase")) {
      secretStaircase = newTile;
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

  activePlayer.currentTile = movingToTile;
  activePlayer.row = row;
  activePlayer.col = column;
  activePlayer.position.style.gridRow = row;
  activePlayer.position.style.gridColumn = column;
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

function handlePlayerMovesFloors() {
  if (
    displayedFloor.classList.contains("ground") &&
    activePlayer.position.style.gridRow === groundFloorStaircase.style.gridRow &&
    activePlayer.position.style.gridColumn === groundFloorStaircase.style.gridColumn
  ) {
    activePlayer.currentTile = tiles[4];
    switchBoards("upper-btn");
    positionPlayers("mid", "upper", [upperLanding.style.gridRow, upperLanding.style.gridColumn]);
  } else if (
    displayedFloor.classList.contains("upper") &&
    activePlayer.position.style.gridRow === upperLanding.style.gridRow &&
    activePlayer.position.style.gridColumn === upperLanding.style.gridColumn
  ) {
    activePlayer.currentTile = tiles[3];
    switchBoards("ground-btn");
    positionPlayers("mid", "ground", [groundFloorStaircase.style.gridRow, groundFloorStaircase.style.gridColumn]);
  } else if (
    displayedFloor.classList.contains("ground") &&
    activePlayer.position.style.gridRow === laundryChute.style.gridRow &&
    activePlayer.position.style.gridColumn === laundryChute.style.gridColumn
  ) {
    activePlayer.currentTile = tiles[0];
    switchBoards("basement-btn");
    positionPlayers("mid", "basement", [
      parseInt(basementLanding.style.gridRow),
      parseInt(basementLanding.style.gridColumn),
    ]);
  } else if (
    displayedFloor.classList.contains("basement") &&
    activePlayer.position.style.gridRow === secretStaircase.style.gridRow &&
    activePlayer.position.style.gridColumn === secretStaircase.style.gridColumn
  ) {
    activePlayer.currentTile = tiles[2];
    switchBoards("ground-btn");
    positionPlayers("mid", "ground", [parseInt(hallway.style.gridRow), parseInt(hallway.style.gridColumn)]);
  } else if (
    displayedFloor.classList.contains("ground") &&
    activePlayer.position.style.gridRow === hallway.style.gridRow &&
    activePlayer.position.style.gridColumn === hallway.style.gridColumn &&
    secretStaircase !== undefined
  ) {
    let secretStaircaseData;
    usedTiles.forEach((tileData) => {
      if (tileData.name === secretStaircase.classList[1].replace("-", " ")) {
        secretStaircaseData = tileData;
      }
    });
    activePlayer.currentTile = secretStaircaseData;
    switchBoards("basement-btn");
    positionPlayers("mid", "basement", [
      parseInt(secretStaircase.style.gridRow),
      parseInt(secretStaircase.style.gridColumn),
    ]);
  }
}

endTurnBtn.addEventListener("click", handleEndOfTurn);

function handleEndOfTurn() {
  alert("end of turn");
}

makeButtonsActive();
positionStartingTiles();
positionPlayers("start", "ground");
