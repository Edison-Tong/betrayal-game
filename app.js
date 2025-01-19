import { tiles, initialTiles } from "./tiles.js";

let boards = document.querySelectorAll(".board");
let lvl_btns = document.querySelectorAll(".level-btn");
let startingTiles = document.querySelectorAll(".tile.start");
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
  startingTiles.forEach((tile, i) => {
    tile.style.backgroundImage = `url(./images/${initialTiles[i].image})`;
    tile.style.gridRow = initialTiles[i].row;
    tile.style.gridColumn = initialTiles[i].col;
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

function handlePlayerMovement() {
  let key = event.key;
  let row;
  let column;
  if (displayedFloor.classList.contains(activePlayer.currentFloor)) {
    row = parseInt(activePlayer.position.style.gridRow);
    column = parseInt(activePlayer.position.style.gridColumn);
    if (key === "ArrowUp") {
      row -= 1;
    } else if (key === "ArrowRight") {
      column += 1;
    } else if (key === "ArrowDown") {
      row += 1;
    } else if (key === "ArrowLeft") {
      column -= 1;
    } else if (key === "Enter") {
      handlePlayerMovesFloors();
      return;
    }
  }

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

  activePlayer.speed -= 1;
  let existingTile = Array.from(displayedFloor.children).find((child) => {
    return (
      child.classList.contains("tile") &&
      parseInt(child.style.gridColumn) === column &&
      parseInt(child.style.gridRow) === row
    );
  });

  if (!existingTile) {
    let newTileInfo = getTileData();
    if (newTileInfo === undefined) {
      alert("There are no more tiles for this floor");
      return;
    }
    let newTile = document.createElement("div");
    newTile.classList.add("tile", newTileInfo.name.replaceAll(" ", ""));
    newTile.style.backgroundImage = `url(./images/${newTileInfo.image})`;
    newTile.style.gridRow = row;
    newTile.style.gridColumn = column;
    console.log(newTile);
    if (newTile.classList.contains("LaundryChute")) {
      laundryChute = newTile;
    } else if (newTile.classList.contains("SecretStaircase")) {
      secretStaircase = newTile;
    }
    displayedFloor.append(newTile);
    handleRotateTile(newTile);
  }

  activePlayer.row = row;
  activePlayer.col = column;
  activePlayer.position.style.gridRow = row;
  activePlayer.position.style.gridColumn = column;
}

function handleRotateTile(tile) {}

function getTileData() {
  let availableTiles = [];
  let usedTile;
  tiles.forEach((tile) => {
    if (tile.floors[displayedFloor.classList[1]]) {
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

function handlePlayerMovesFloors() {
  if (
    displayedFloor.classList.contains("ground") &&
    activePlayer.position.style.gridRow === groundFloorStaircase.style.gridRow &&
    activePlayer.position.style.gridColumn === groundFloorStaircase.style.gridColumn
  ) {
    switchBoards("upper-btn");
    positionPlayers("mid", "upper", [upperLanding.style.gridRow, upperLanding.style.gridColumn]);
  } else if (
    displayedFloor.classList.contains("upper") &&
    activePlayer.position.style.gridRow === upperLanding.style.gridRow &&
    activePlayer.position.style.gridColumn === upperLanding.style.gridColumn
  ) {
    switchBoards("ground-btn");
    positionPlayers("mid", "ground", [groundFloorStaircase.style.gridRow, groundFloorStaircase.style.gridColumn]);
  } else if (
    displayedFloor.classList.contains("ground") &&
    activePlayer.position.style.gridRow === laundryChute.style.gridRow &&
    activePlayer.position.style.gridColumn === laundryChute.style.gridColumn
  ) {
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
    switchBoards("ground-btn");
    positionPlayers("mid", "ground", [parseInt(hallway.style.gridRow), parseInt(hallway.style.gridColumn)]);
  } else if (
    displayedFloor.classList.contains("ground") &&
    activePlayer.position.style.gridRow === hallway.style.gridRow &&
    activePlayer.position.style.gridColumn === hallway.style.gridColumn &&
    secretStaircase !== undefined
  ) {
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
