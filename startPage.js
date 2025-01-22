import playerInfo from "./playerInfo.js";

let playerCount = document.querySelector("#player-count");
let startBtn = document.querySelector("#start-game");

playerCount.addEventListener("change", setPlayerCount);
startBtn.addEventListener("click", startGame);

function setPlayerCount() {
    console.log(playerCount);
}

function startGame() {
    console.log("Start");
}
