import { tiles, initialTiles } from "./tiles.js";

let boards = document.querySelectorAll(".board");
let lvl_btns = document.querySelectorAll(".level-btn");
let startingTiles = document.querySelectorAll(".tile.start");
let displayedFloor = document.querySelector(".board.active");
let currentFloorBtn = document.querySelector("#current");
let playerCount = 3;

boards.forEach((board) => {
  board.style.gridTemplateRows = "repeat(11 ,1fr)";
  board.style.gridTemplateColumns = "repeat(11 ,1fr)";
});

function makeButtonsActive() {
  lvl_btns.forEach((button) => {
    if (!button.getAttribute("id", "current"))
      button.addEventListener("click", () => {
        switchBoards(button.classList[1]);
      });
  });
}

// .replace("-btn", "")

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
    tile.style.gridRow = initialTiles[i].row;
    tile.style.gridColumn = initialTiles[i].col;
  });
}

let players = [];
function positionPlayers() {
  for (let i = 1; i <= playerCount; i++) {
    let player = {
      id: `${i}`,
      name: `Player${i}`,
      label: `P${i}`,
      currentFloor: "ground",
      position: document.createElement("div"),
      row: 10,
      col: 6,
    };

    player.position.classList.add("player");
    player.position.innerHTML = player.label;
    player.position.style.gridRow = 10;
    player.position.style.gridColumn = 6;
    document.querySelector(".board.ground").append(player.position);
    players.push(player);
  }
}

document.addEventListener("keydown", handlePlayerMovement);

function handlePlayerMovement() {
  let key = event.key;
  let row = parseInt(players[1].position.style.gridRow);
  let column = parseInt(players[1].position.style.gridColumn);
  if (displayedFloor.classList.contains(players[1].currentFloor)) {
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
    }
  }
  players[1].row = row;
  players[1].col = column;
  players[1].position.style.gridRow = row;
  players[1].position.style.gridColumn = column;
}

function handlePlayerMovesFloors() {
  if (
    displayedFloor.classList.contains("ground") &&
    players[1].position.style.gridRow === "8" &&
    players[1].position.style.gridColumn === "6"
  ) {
    console.log("move to upper");
    switchBoards("upper-btn");
  } else if (
    displayedFloor.classList.contains("upper") &&
    players[1].position.style.gridRow === "6" &&
    players[1].position.style.gridColumn === "6"
  ) {
    console.log("move to ground");
  } else if (
    displayedFloor.classList.contains("basement") &&
    players[1].position.style.gridRow === "6" &&
    players[1].position.style.gridColumn === "6"
  ) {
    console.log("move to ground");
  } else if (
    displayedFloor.classList.contains("ground") &&
    players[1].position.style.gridRow === NaN &&
    players[1].position.style.gridColumn === Nan
  ) {
    console.log("move to ground");
  }
}

makeButtonsActive();
positionStartingTiles();
positionPlayers();
