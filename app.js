import tiles from "./tiles.js";
import playerInfo from "./playerInfo.js";
import cards from "./cards.js";
import tokens from "./tokens.js";

let boards = document.querySelectorAll(".board");
let dice = document.querySelectorAll(".die");
let totalDisplay = document.querySelector(".total-display");
let rollBtn = document.querySelector(".roll-btn");
let lvl_btns = document.querySelectorAll(".level-btn");
let tracker = document.querySelector(".tracker");
let trackerValue = 0;
let hauntStarted = false;
let startingTiles = [];
let displayedFloor = document.querySelector(".board.active");
let displayedFloorName = document.querySelector(".board.active").classList[1];
let currentFloorBtn = document.querySelector("#current");
let endTurnBtn = document.querySelector(".endTurnBtn");
let viewCardsBtn = document.querySelector(".view-cards-btn");
let exitCardsBtn = document.querySelector(".exit-btn");
let playerCardsDisplay = document.querySelector(".player-cards");
let cardDisplay = document.querySelector(".card-display");
let playerCount = 1;
let players = [];
let activePlayer;
let playerTurnCounter = 0;
let playerStatsInfo;
let laundryChute;
let secretStaircase;
let isRotating = false;
let movingToTile;
let previousTile;
export let usedTiles = [];
export let selectedTiles = [];
let direction;
let tileMessageBox = document.querySelector(".tile-message");
let symbolFound;
let diceRolling = false;
let traitChanging = false;
let tileChoosing = false;
let firstMove = true;

export let movementTiles = {
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
        data: tiles[38],
    },
    gallery: {
        opposite: "ballroom",
        connectingFloor: "ground",
        data: tiles[8],
    },
    ballroom: { connectingFloor: "upper", data: tiles[5] },
    undergroundCavern: {
        opposite: "graveyard",
        connectingFloor: "ground",
        data: tiles[18],
    },
    graveyard: {
        opposite: "undergroundCavern",
        connectingFloor: "basement",
        data: tiles[20],
    },

    entranceHall: {
        data: tiles[1],
        element: document.querySelector(".entrance-hall"),
    },
};

let endOfTurnTiles = {
    laundryChute: {
        data: tiles[27],
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
        data: tiles[12],
        effect: async () => {
            let roll = await handleDiceRoll(activePlayer.stats.speed);
            if (roll >= 5) {
            } else {
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
        data: tiles[17],
        effect: async () => {
            let roll = await handleDiceRoll(1);
            let damage = await handleTraitChange("physical", roll, "lose");
        },
    },
};

let discoverTiles = {
    armory: {
        data: tiles[5],
    },
    chapel: {
        data: tiles[9],
    },
    gymnasium: {
        data: tiles[22],
    },
    larder: {
        data: tiles[26],
    },
    library: {
        data: tiles[28],
    },
    armory: {
        data: tiles[5],
    },
    junkRoom: {
        data: tiles[23],
    },
    panicRoom: {
        data: tiles[34],
    },
    vault: {
        data: tiles[45],
    },
};

// document.addEventListener("keydown", handlePlayerMovement);
endTurnBtn.addEventListener("click", handleEndOfTurn);

viewCardsBtn.addEventListener("click", () => {
    playerCardsDisplay.classList.remove("hidden");
});

exitCardsBtn.addEventListener("click", () => {
    playerCardsDisplay.classList.add("hidden");
});

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
        activePlayer.marker.style.gridRow =
            parseInt(activePlayer.marker.style.gridRow) - 1;
    } else if (direction === "left") {
        Array.from(displayedFloor.children).forEach((child) => {
            let newColumn = parseInt(child.style.gridColumn);
            newColumn += 1;
            child.style.gridColumn = newColumn;
        });
        activePlayer.marker.style.gridColumn =
            parseInt(activePlayer.marker.style.gridColumn) - 1;
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
    document.querySelectorAll(".tile.start").forEach((tile, i) => {
        tile.style.backgroundImage = `url(./images/${tiles[i].image})`;
        tile.style.gridRow = tiles[i].row;
        tile.style.gridColumn = tiles[i].col;
        usedTiles[i].element = tile;
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
                    speed: playerInfo[i].stats.speed.slider[
                        playerInfo[i].stats.speed.index
                    ],
                    might: playerInfo[i].stats.might.slider[
                        playerInfo[i].stats.might.index
                    ],
                    knowledge:
                        playerInfo[i].stats.knowledge.slider[
                            playerInfo[i].stats.knowledge.index
                        ],
                    sanity: playerInfo[i].stats.sanity.slider[
                        playerInfo[i].stats.sanity.index
                    ],
                },
                cards: [],
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
            movingToTile = tiles[1];
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

export function renderPlayerStats(trait) {
    let playerNameElement = document.querySelector("#player-name");
    playerNameElement.innerHTML = activePlayer.name;
    let playerStatsInfo = playerInfo[activePlayer.id.replace("p", "")].stats;

    for (let key in playerStatsInfo) {
        let container = document.querySelector(`#player-${key}`);
        container.innerHTML = ""; // Clear the existing stat spans

        playerStatsInfo[key].slider.forEach((value, i) => {
            let span = document.createElement("span");
            if (i === playerStatsInfo[key].startingIndex) {
                span.classList.add("base-stat");
            }

            if (i === playerStatsInfo[key].index) {
                span.classList.add("current-stat");
            } else if (i === 0) {
                span.classList.add("dead-stat");
            }

            span.textContent = value;
            container.appendChild(span);
            container.appendChild(document.createTextNode(" "));
        });
    }
}

export function renderPlayerCards() {
    Array.from(playerCardsDisplay.children).forEach((child) => {
        if (!child.classList.contains("exit-btn")) {
            child.remove();
        }
    });
    activePlayer.cards.forEach((card, i) => {
        let newCard = document.createElement("div");
        let cardAbility = document.createElement("div");
        let cardBtn = document.createElement("button");
        newCard.classList.add("card");
        newCard.classList.add(card.type);
        newCard.innerHTML = card.name;
        playerCardsDisplay.append(newCard);
        cardAbility.classList.add("card-ability");
        cardAbility.innerHTML = card.ability;
        newCard.append(cardAbility);
        cardBtn.innerHTML = "use";
        newCard.append(cardBtn);
        activePlayer.cards[i].element = newCard;
    });
}

async function handlePlayerMovement() {
    if (
        isRotating ||
        activePlayer.stats.speed === activePlayer.movesThisTurn ||
        symbolFound
    ) {
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
            direction = "vertical";
            let moveToTile = activePlayer.currentTile.name.replaceAll(" ", "");
            if (
                handlePlayerMovesTiles(
                    movementTiles[moveToTile].opposite,
                    movementTiles[moveToTile].connectingFloor
                ) === false
            ) {
                return;
            }
            column = activePlayer.currentTile.col;
            row = activePlayer.currentTile.row;
        }
    }
    if (
        !activePlayer.currentTile.doors.some((door) => door === direction) &&
        direction !== "vertical"
    ) {
        return;
    }

    let existingTile = Array.from(displayedFloor.children).find((child) => {
        return (
            child.classList.contains("tile") &&
            parseInt(child.style.gridColumn) === column &&
            parseInt(child.style.gridRow) === row
        );
    });

    if (!existingTile && direction !== "vertical") {
        previousTile = movingToTile;
        movingToTile = getTileData();
        if (movingToTile === undefined) {
            alert("There are no more tiles for this floor");
            movingToTile = previousTile;
            return;
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

        let newTile = document.createElement("div");
        newTile.classList.add(
            "tile",
            movingToTile.name.replaceAll(" ", "-").toLowerCase()
        );
        newTile.style.backgroundImage = `url(./images/${movingToTile.image})`;
        newTile.style.gridRow = row;
        newTile.style.gridColumn = column;
        movingToTile.element = newTile;
        usedTiles.push(movingToTile);

        if (movingToTile.symbol !== "none") {
            symbolFound = true;
        }

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
        handlePlayerGainsCard(movingToTile);

        if (movingToTile.type === "discover") {
            movingToTile.effect(playerInfo, activePlayer);
            renderPlayerStats();
        }
    } else {
        previousTile = movingToTile;
        usedTiles.forEach((tile) => {
            if (
                tile.name.toLowerCase() ===
                existingTile.classList[1].replaceAll("-", " ")
            ) {
                movingToTile = tile;
            }
        });
        if (!checkDoorAlignment() && direction !== "vertical") {
            return;
        }
    }
    checkForObstacles();
    activePlayer.movesThisTurn += 1;

    if (activePlayer.movesThisTurn > activePlayer.stats.speed) {
        if (!firstMove) {
            return;
        }
    }

    firstMove = false;
    movingToTile.message === "none"
        ? (tileMessageBox.style.display = "none")
        : ((tileMessageBox.style.display = "block"),
          (tileMessageBox.innerHTML = movingToTile.message));
    activePlayer.currentTile = movingToTile;

    activePlayer.row = row;
    activePlayer.col = column;
    activePlayer.marker.style.gridRow = row;
    activePlayer.marker.style.gridColumn = column;
}

function checkForObstacles() {
    if (previousTile.token) {
        if (previousTile.token.type === "obstacle") {
            activePlayer.movesThisTurn += 1;
        }
    }
}

// FOR TESTING
// document.addEventListener("keydown", () => {
//     if (event.key === "t") {
//         handleTraitChange("general", 5, "lose");
//     } else if (event.key === "y") {
//         handleTraitChange("general", 5, "gain");
//     }
// });

export async function handlePlayerGainsCard(tile) {
    if (!tile) {
        tile = { symbol: "item" };
    }
    let usedCard;

    if (tile.symbol !== "none" && tile.symbol !== "event") {
        let availableCards = [];
        cards.forEach((card) => {
            if (card.type === tile.symbol) {
                availableCards.push(card);
            }
        });
        if (!availableCards[0]) {
        } else {
            usedCard = availableCards.splice(
                Math.floor(Math.random() * availableCards.length),
                1
            )[0];
            activePlayer.cards.push(usedCard);
            cards.splice(cards.indexOf(usedCard), 1);
            renderPlayerCards();
            displayCardInfo(usedCard);
            if (tile.symbol === "omen") {
                setTracker();
                let hauntStart = await handleDiceRoll(trackerValue);
                if (hauntStart >= 5) {
                    console.log("START THE HAUNT");
                }
            }
        }
    } else if (tile.symbol === "event") {
        let availableCards = cards.filter((card) => card.type === tile.symbol);

        if (availableCards.length > 0) {
            // Select a random card and remove it from the available cards
            let randomIndex = Math.floor(Math.random() * availableCards.length);
            let usedCard = availableCards[randomIndex];
            displayCardInfo(usedCard);

            cards.splice(cards.indexOf(usedCard), 1); // Remove from deck
            usedCard.effect(activePlayer, trackerValue, hauntStarted); // Apply the card's effect
        }
    }
}

export function handlePlayerDiscardsCard() {
    playerCardsDisplay.classList.remove("hidden");
    activePlayer.cards.forEach((card) => {
        if (card.type === "item") {
            let removeItemBtn = document.createElement("button");
            removeItemBtn.innerHTML = "Discard";
            card.element.append(removeItemBtn);
            let cardName = card.name;
            removeItemBtn.addEventListener("click", () => {
                let itemName = cardName;
                event.target.parentElement.remove();
                activePlayer.cards.forEach((card) => {
                    if (card.name === itemName) {
                        let index = activePlayer.cards.indexOf(card);
                        activePlayer.cards.splice(index, 1);
                    }
                });
            });
        }
    });
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
        if (
            tile.floors[displayedFloor.classList[1]] &&
            tile.type !== "starting"
        ) {
            availableTiles.push(tile);
        }
    });
    if (availableTiles[0] === undefined) {
        return;
    }
    usedTile = availableTiles.splice(
        Math.floor(Math.random() * availableTiles.length),
        1
    )[0];
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

export async function checkTileAdjacent(tile) {
    let adjacentCalc = {
        top: { row: -1, column: 0 },
        bottom: { row: 1, column: 0 },
        left: { row: 0, column: -1 },
        right: { row: 0, column: 1 },
    };
    let adjacentTiles = [];

    tile.doors.forEach((door) => {
        let row = parseInt(tile.element.style.gridRow);
        let column = parseInt(tile.element.style.gridColumn);
        row += adjacentCalc[door].row;
        column += adjacentCalc[door].column;
        Array.from(displayedFloor.children).find((child) => {
            if (
                child.classList.contains("tile") &&
                parseInt(child.style.gridColumn) === column &&
                parseInt(child.style.gridRow) === row
            ) {
                let tileName = child.classList[1].replaceAll("-", "");
                movingToTile = usedTiles.filter(
                    (tile) =>
                        tile.name.replaceAll(" ", "").toLowerCase() === tileName
                )[0];
                direction = door;
                if (checkDoorAlignment()) {
                    adjacentTiles.push(movingToTile);
                }
            }
        });
    });
    await makeTilesButtons(adjacentTiles, 1);
    handlePlayerMovesTiles(
        activePlayer.currentTile.name.replaceAll(" ", ""),
        selectedTiles[0].name.replaceAll(" ", ""),
        selectedTiles[0].element.parentElement.classList[1]
    );
    removeTileButton(tiles);
}

// ISSUE MOVING FROM GALLERY TO BALLROOM
export async function handlePlayerMovesTiles(opposite, level) {
    if (!opposite) {
        return false;
    }
    let row;
    let column;
    let newCurrentTile;
    usedTiles.forEach((tile) => {
        if (tile.name.replaceAll(" ", "") === opposite) {
            row = tile.element.style.gridRow;
            column = tile.element.style.gridColumn;
            newCurrentTile = tile;
        }
    });
    if (!newCurrentTile) {
        return false;
    }
    setTimeout(() => {
        activePlayer.currentTile = newCurrentTile;
        switchBoards(level);
        positionPlayers("mid", level, [row, column]);
    }, 1);
}

async function handleEndOfTurn() {
    if (!diceRolling && !traitChanging && !tileChoosing) {
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
        renderPlayerCards();
        symbolFound = false;
        firstMove = true;
        endTurnBtn.addEventListener("click", handleEndOfTurn);
    }
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
    cardDisplay.classList.add("hidden");

    return Promise.all(promises); // Ensure all tasks complete
}

export async function handleDiceRoll(diceAmount) {
    let extraDice = await getExtraDice();
    diceRolling = true;
    rollBtn.style.display = "inline";
    totalDisplay.innerHTML = "Rolling...";
    let interval;
    diceAmount += extraDice;
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
                // FUNCTION TO ADD TO THE TOTAL IF CORRESPONDING ITEM OR OMEN IS POSSESSED BY THE PLAYER
                totalDisplay.innerHTML = `Your roll: ${total}`;
                resolve(total); // Resolve the promise with the computed total
            },
            { once: true }
        ); // Ensure the event fires only once
    });
    diceRolling = false;
    return total;
}

async function getExtraDice() {
    let extras = await new Promise((resolve) => {
        let extras = 0;
        if (activePlayer.currentTile.token) {
            if (activePlayer.currentTile.token.type === "blessing") {
                extras = 1;
            }
        }
        // FUNCTION TO ASK PLAYER IF THEY WANT TO USE AN ITEM OR AN OMEN
        resolve(extras);
    });
    return extras;
}

export function handleTraitChange(type, amount, gainOrLose) {
    if (amount === 0) return;
    traitChanging = true;
    return new Promise((resolve, reject) => {
        try {
            let playerStatsInfo =
                playerInfo[activePlayer.id.replace("p", "")].stats;
            let change = 0;
            let initialStats = {
                speed: playerStatsInfo.speed.index,
                might: playerStatsInfo.might.index,
                knowledge: playerStatsInfo.knowledge.index,
                sanity: playerStatsInfo.sanity.index,
            };

            // Find buttons to show
            let buttons = document.querySelectorAll(`.${type} button`);
            buttons.forEach((button) => {
                button.classList.remove("hidden");
                if (button.classList.contains("increment")) {
                    button.addEventListener("click", raiseTrait);
                } else {
                    button.addEventListener("click", lowerTrait);
                }
            });
            let confirmTraitsBtn = document.querySelector(".confirm-btn");
            confirmTraitsBtn.classList.remove("hidden");
            confirmTraitsBtn.addEventListener("click", confirmTraits);

            function raiseTrait(event) {
                let trait = event.target.classList[1].replace("-btn", "");
                if (
                    (gainOrLose === "lose" &&
                        initialStats[trait] === playerStatsInfo[trait].index) ||
                    change === -amount
                ) {
                    return;
                }

                change--;
                playerStatsInfo[trait].index++;
                activePlayer.stats[trait] =
                    playerStatsInfo[trait].slider[playerStatsInfo[trait].index];
                renderPlayerStats(trait);
            }

            function lowerTrait(event) {
                let trait = event.target.classList[1].replace("-btn", "");

                if (
                    (gainOrLose === "gain" &&
                        initialStats[trait] === playerStatsInfo[trait].index) ||
                    change === amount
                ) {
                    return;
                }

                change++;
                playerStatsInfo[trait].index--;
                activePlayer.stats[trait] =
                    playerStatsInfo[trait].slider[playerStatsInfo[trait].index];
                renderPlayerStats(trait);
            }

            function confirmTraits() {
                if (change === amount || change === -amount) {
                    buttons.forEach((button) => {
                        button.classList.add("hidden");
                        if (button.classList.contains("increment")) {
                            button.removeEventListener("click", raiseTrait);
                        } else {
                            button.removeEventListener("click", lowerTrait);
                        }
                        confirmTraitsBtn.classList.add("hidden");
                        confirmTraitsBtn.removeEventListener(
                            "click",
                            confirmTraits
                        );
                    });
                    resolve({ change });
                }
                traitChanging = false;
            }
        } catch (error) {
            reject(error); // In case of an error
        }
    });
}

export function getPlayerChoice(options, message) {
    return new Promise((resolve) => {
        let modal = document.createElement("div");
        modal.innerHTML = message;
        modal.classList.add("choice-modal");

        options.forEach((option) => {
            let button = document.createElement("button");
            button.textContent = `${
                option.charAt(0).toUpperCase() + option.slice(1)
            }`;
            button.onclick = () => {
                document.body.removeChild(modal);
                resolve(option);
            };
            modal.appendChild(button);
        });

        document.body.appendChild(modal);
    });
}

export function makeTilesButtons(tiles, amount) {
    tileChoosing = true;
    let clickCount = 0;

    return new Promise((resolve, reject) => {
        tiles.forEach((tile) => {
            tile.element.classList.add("tile-button");
            let handler = (event) => {
                clickCount++;
                selectedTiles.push(tile);
                tile.element.removeEventListener("click", handler);
                tile.element.classList.remove("tile-button");

                if (clickCount >= amount) {
                    resolve(tile);
                }
            };
            tile.clickHandler = handler;
            tile.element.addEventListener("click", handler);
        });
    });
}

export function removeTileButton(tiles) {
    tiles.forEach((tile) => {
        tile.element.classList.remove("tile-button");
        if (tile.clickHandler) {
            tile.element.removeEventListener("click", tile.clickHandler);
            delete tile.clickHandler;
        }
    });
    tileChoosing = false;
}

export function displayCardInfo(eventInfo) {
    cardDisplay.classList.remove("hidden", "omen", "event", "item");
    cardDisplay.classList.add(eventInfo.type);

    if (eventInfo.type === "event") {
        Array.from(cardDisplay.children).forEach((child) => {
            child.innerHTML =
                eventInfo[child.classList[0].replace("card-", "")];
        });
    } else if (eventInfo.type === "item" || eventInfo.type === "omen") {
        let info = [];
        for (let key in eventInfo) {
            if (key !== "type" && key !== "weapon") {
                info.push(eventInfo[key]);
            }
        }
        Array.from(cardDisplay.children).forEach((child, i) => {
            child.innerHTML = info[i];
        });
    }
}

export function placeToken(type, tile) {
    let token = tokens.filter((token) => token.type === type)[0];
    let tokenElement = document.createElement("div");
    tokenElement.classList.add("token");
    tokenElement.innerHTML = type;
    if (!tile) {
        movingToTile.element.append(tokenElement);
        movingToTile.token = token;
    } else {
        tile.element.append(tokenElement);
    }
}

document.addEventListener("keydown", () => {
    if (event.key === "a") {
        handleDiceRoll(4);
    }
});

function setTracker() {
    if (trackerValue === 8) {
        console.log("START THE HAUNT");
    } else {
        trackerValue++;
        tracker.children[0].innerHTML = trackerValue;
    }
}

makeButtonsActive();
positionStartingTiles();
positionPlayers("start", "ground", [3, 2]);
renderPlayerStats("start");
