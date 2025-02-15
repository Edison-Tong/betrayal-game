import {
    renderPlayerCards,
    handlePlayerGainsCard,
    displayCardInfo,
    placeToken,
} from "./app.js";
import cards from "./cards.js";

let tiles = [
    {
        name: "basement Landing",
        type: "starting",
        floors: { basement: true, ground: false, upper: false },
        doors: ["top", "right", "bottom", "left"],
        image: "Basement_Landing.png",
        row: 2,
        col: 2,
        message: "none",
    },
    {
        name: "entrance Hall",
        type: "starting",
        floors: { basement: false, ground: true, upper: false },
        doors: ["top", "right", "left"],
        image: "Entrance_Hall.png",
        row: 3,
        col: 2,
        message: "none",
    },
    {
        name: "hallway",
        type: "starting",
        floors: { basement: false, ground: true, upper: false },
        doors: ["top", "right", "bottom", "left"],
        image: "Hallway.png",
        row: 2,
        col: 2,
        message: `Leads to the Secret Stairs`,
    },
    {
        name: "ground Floor Staircase",
        type: "starting",
        floors: { basement: false, ground: true, upper: false },
        doors: ["bottom"],
        image: "Ground_Floor_Staircase.png",
        row: 1,
        col: 2,
        message: `Leads to the Upper Landing`,
    },
    {
        name: "upper Landing",
        type: "starting",
        floors: { basement: false, ground: false, upper: true },
        doors: ["top", "right", "bottom", "left"],
        image: "Upper_Landing.png",
        row: 2,
        col: 2,
        message: `Leads to the Ground Floor Staircase`,
    },
    // {
    //     name: "armory",
    //     type: "discover",
    //     floors: { basement: true, ground: true, upper: false },
    //     doors: ["top", "right"],
    //     image: "Armory.png",
    //     symbol: "none",
    //     message: `When you discover this tile,
    //                       reveal cards from the top of the item deck until you reveal a weapon. <br>
    //                           Take it and bury the rest`,
    //     effect: (playerInfo, activePlayer) => {
    //         let availableCards = [];
    //         let usedCard;
    //         cards.forEach((card) => {
    //             if (card.weapon === true) {
    //                 availableCards.push(card);
    //             }
    //         });
    //         if (!availableCards[0]) {
    //         } else {
    //             usedCard = availableCards.splice(
    //                 Math.floor(Math.random() * availableCards.length),
    //                 1
    //             )[0];
    //             activePlayer.cards.push(usedCard);
    //             cards.splice(cards.indexOf(usedCard), 1);
    //             displayCardInfo(usedCard);
    //             renderPlayerCards();
    //         }
    //     },
    // },
    // {
    //     name: "ballroom",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: false },
    //     doors: ["top", "right", "bottom", "left"],
    //     image: "Ballroom.png",
    //     symbol: "omen",
    //     message: "none",
    // },
    {
        name: "bloody Room",
        type: "normal",
        floors: { basement: false, ground: true, upper: true },
        doors: ["top", "right"],
        image: "Bloody_Room.png",
        symbol: "item",
        message: "none",
    },
    // {
    //     name: "catacombs",
    //     type: "normal",
    //     floors: { basement: true, ground: false, upper: false },
    //     doors: ["top", "right", "bottom", "left"],
    //     image: "Catacombs.png",
    //     symbol: "omen",
    //     message: "none",
    // },
    // {
    //     name: "chapel",
    //     type: "discover",
    //     floors: { basement: false, ground: true, upper: false },
    //     doors: ["top", "bottom"],
    //     image: "Chapel.png",
    //     symbol: "omen",
    //     message: `When you discover this tile, gain 1 Sanity`,
    //     effect: (playerInfo, activePlayer) => {
    //         let playerStatsInfo =
    //             playerInfo[activePlayer.id.replace("p", "")].stats;
    //         playerStatsInfo.sanity.index++;
    //         activePlayer.stats.sanity =
    //             playerStatsInfo.sanity.slider[playerStatsInfo.sanity.index];
    //     },
    // },
    // {
    //     name: "charred Room",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: true },
    //     doors: ["top", "right"],
    //     image: "Charred_Room.png",
    //     symbol: "omen",
    //     message: "none",
    // },
    // {
    //     name: "chasm",
    //     type: "normal",
    //     floors: { basement: true, ground: false, upper: false },
    //     doors: ["top", "bottom"],
    //     image: "Chasm.png",
    //     symbol: "event",
    //     message: "none",
    // },
    // {
    //     name: "collapsed Room",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: true },
    //     doors: ["top", "right"],
    //     image: "Collapsed_Room.png",
    //     symbol: "none",
    //     message: `If you end your tur on this tile, make a speed roll. <br>
    //                       5+: Nothing happens. <br>
    //                       4-0: Place your explorer on the Basement Landing and take one die of Physical damage`,
    // },
    // {
    //     name: "conservatory",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: false },
    //     doors: ["top", "bottom"],
    //     image: "Conservatory.png",
    //     symbol: "item",
    //     message: "none",
    // },
    // {
    //     name: "cramped Passageway",
    //     type: "normal",
    //     floors: { basement: true, ground: true, upper: true },
    //     doors: ["top", "right", "bottom", "left"],
    //     image: "Cramped_Passageway.png",
    //     symbol: "event",
    //     message: "none",
    // },
    {
        name: "crawlspace",
        type: "normal",
        floors: { basement: true, ground: false, upper: true },
        doors: ["top", "right", "left"],
        image: "Crawlspace.png",
        symbol: "event",
        message: "none",
    },
    // {
    //     name: "dining Room",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: false },
    //     doors: ["top", "right", "bottom", "left"],
    //     image: "Dining_Room.png",
    //     symbol: "event",
    //     message: "none",
    // },
    // {
    //     name: "furnace Room",
    //     type: "normal",
    //     floors: { basement: true, ground: false, upper: false },
    //     doors: ["right", "bottom", "left"],
    //     image: "Furnace_Room.png",
    //     symbol: "event",
    //     message: `If you end your turn on this tile, take one die of Physical damage`,
    // },
    // {
    //     name: "gallery",
    //     type: "normal",
    //     floors: { basement: false, ground: false, upper: true },
    //     doors: ["top", "bottom"],
    //     image: "Gallery.png",
    //     symbol: "event",
    //     message: `Leads to Ballroom`,
    // },
    // {
    //     name: "game Room",
    //     type: "normal",
    //     floors: { basement: true, ground: false, upper: true },
    //     doors: ["top", "right", "bottom", "left"],
    //     image: "Game_Room.png",
    //     symbol: "item",
    //     message: "none",
    // },
    // {
    //     name: "graveyard",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: false },
    //     doors: ["top", "right"],
    //     image: "Graveyard.png",
    //     symbol: "omen",
    //     message: `Leads to the Underground Cavern`,
    // },
    // {
    //     name: "guest Quarters",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: true },
    //     doors: ["top", "right"],
    //     image: "Guest_Quarters.png",
    //     symbol: "event",
    //     message: "none",
    // },
    // {
    //     name: "gymnasium",
    //     type: "discover",
    //     floors: { basement: true, ground: true, upper: false },
    //     doors: ["top", "left"],
    //     image: "Gymnasium.png",
    //     symbol: "none",
    //     message: `When you discover this tile, gain 1 Speed`,
    //     effect: (playerInfo, activePlayer) => {
    //         let playerStatsInfo =
    //             playerInfo[activePlayer.id.replace("p", "")].stats;
    //         playerStatsInfo.speed.index++;
    //         activePlayer.stats.speed =
    //             playerStatsInfo.speed.slider[playerStatsInfo.speed.index];
    //     },
    // },
    // {
    //     name: "junk Room",
    //     type: "discover",
    //     floors: { basement: false, ground: true, upper: true },
    //     doors: ["top", "right", "bottom"],
    //     image: "Junk_Room.png",
    //     symbol: "item",
    //     message: `When you discover this tile, place an Obstacle token on it`,
    //     effect: () => {
    //         console.log("JUNK ROOM");
    //         placeToken("obstacle");
    //     },
    // },
    // {
    //     name: "kitchen",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: false },
    //     doors: ["top", "bottom"],
    //     image: "Kitchen.png",
    //     symbol: "event",
    //     message: "none",
    // },
    // {
    //     name: "laboratory",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: false },
    //     doors: ["top", "right"],
    //     image: "Laboratory.png",
    //     symbol: "event",
    //     message: "none",
    // },
    // {
    //     name: "larder",
    //     type: "discover",
    //     floors: { basement: false, ground: true, upper: false },
    //     doors: ["top", "left"],
    //     image: "Larder.png",
    //     symbol: "none",
    //     message: `When you discover this tile, gain 1 Might`,
    //     effect: (playerInfo, activePlayer) => {
    //         let playerStatsInfo =
    //             playerInfo[activePlayer.id.replace("p", "")].stats;
    //         playerStatsInfo.might.index++;
    //         activePlayer.stats.might =
    //             playerStatsInfo.might.slider[playerStatsInfo.might.index];
    //     },
    // },
    // {
    //     name: "laundry Chute",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: false },
    //     doors: ["top"],
    //     image: "Laundry_Chute.png",
    //     symbol: "none",
    //     message: `Leads to the Basement Landing. <br>
    //                     If you end your turn on this tile,
    //                     place your explorer on the Basement Landing`,
    // },
    // {
    //     name: "library",
    //     type: "discover",
    //     floors: { basement: false, ground: true, upper: true },
    //     doors: ["top", "right", "bottom"],
    //     image: "Library.png",
    //     symbol: "omen",
    //     message: `When you discover this tile, gain 1 Knowledge`,
    //     effect: (playerInfo, activePlayer) => {
    //         let playerStatsInfo =
    //             playerInfo[activePlayer.id.replace("p", "")].stats;
    //         playerStatsInfo.knowledge.index++;
    //         activePlayer.stats.knowledge =
    //             playerStatsInfo.knowledge.slider[
    //                 playerStatsInfo.knowledge.index
    //             ];
    //     },
    // },
    // {
    //     name: "mystic Elevator",
    //     type: "normal",
    //     floors: { basement: true, ground: true, upper: true },
    //     doors: ["top"],
    //     image: "Mystic_Elevator.png",
    //     symbol: "none",
    //     message: `Once per turn when you enter this tile, you may roll two dice.
    //                       Move the Mystic Elevator to an open doorway on: <br>
    //                       4+: Any region. <br>
    //                       3: Upper Floor. <br>
    //                       2: Ground Floor. <br>
    //                       1-0: Basement`,
    // },
    // {
    //     name: "nursery",
    //     type: "normal",
    //     floors: { basement: true, ground: true, upper: false },
    //     doors: ["top", "right"],
    //     image: "Nursery.png",
    //     symbol: "omen",
    //     message: "none",
    // },
    // {
    //     name: "observatory",
    //     type: "normal",
    //     floors: { basement: false, ground: false, upper: true },
    //     doors: ["top", "right", "bottom"],
    //     image: "Observatory.png",
    //     symbol: "omen",
    //     message: "none",
    // },
    // {
    //     name: "operating Theatre",
    //     type: "normal",
    //     floors: { basement: true, ground: false, upper: true },
    //     doors: ["top", "right"],
    //     image: "Operating_Theatre.png",
    //     symbol: "item",
    //     message: "none",
    // },
    // {
    //     name: "organ Room",
    //     type: "normal",
    //     floors: { basement: true, ground: false, upper: true },
    //     doors: ["right", "bottom"],
    //     image: "Organ_Room.png",
    //     symbol: "event",
    //     message: "none",
    // },
    // {
    //     name: "panic Room",
    //     type: "discover",
    //     floors: { basement: true, ground: false, upper: false },
    //     doors: ["top"],
    //     image: "Panic_Room.png",
    //     symbol: "omen",
    //     message: `When you discover this tile,
    //                         if the Secret Stairs tile has not been placed,
    //                         find it in the tile stack and place it in the Basement.
    //                         Then, shuffle the tile stack.`,
    //     effect: () => {
    //         console.log("PANIC ROOM");
    //     },
    // },
    // {
    //     name: "primary Bedroom",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: true },
    //     doors: ["top", "right", "bottom"],
    //     image: "Primary_Bedroom.png",
    //     symbol: "omen",
    //     message: "none",
    // },
    // {
    //     name: "ritual Room",
    //     type: "normal",
    //     floors: { basement: true, ground: false, upper: false },
    //     doors: ["top", "right"],
    //     image: "Ritual_Room.png",
    //     symbol: "omen",
    //     message: "none",
    // },
    // {
    //     name: "salon",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: true },
    //     doors: ["top", "right"],
    //     image: "Salon.png",
    //     symbol: "event",
    //     message: "none",
    // },
    // {
    //     name: "secret Staircase",
    //     type: "normal",
    //     floors: { basement: true, ground: false, upper: false },
    //     doors: ["top"],
    //     image: "Secret_Staircase.png",
    //     symbol: "none",
    //     message: `Leads to the Hallway`,
    // },
    // {
    //     name: "soundproofed Room",
    //     type: "normal",
    //     floors: { basement: true, ground: false, upper: true },
    //     doors: ["top", "right", "bottom"],
    //     image: "Soundproofed_Room.png",
    //     symbol: "omen",
    //     message: "none",
    // },
    // {
    //     name: "specimen Room",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: true },
    //     doors: ["right", "left"],
    //     image: "Specimen_Room.png",
    //     symbol: "omen",
    //     message: "none",
    // },
    // {
    //     name: "statuary Corridor",
    //     type: "normal",
    //     floors: { basement: false, ground: false, upper: true },
    //     doors: ["top", "bottom"],
    //     image: "Statuary_Corridor.png",
    //     symbol: "event",
    //     message: "none",
    // },
    // {
    //     name: "tower",
    //     type: "normal",
    //     floors: { basement: false, ground: false, upper: true },
    //     doors: ["top", "bottom"],
    //     image: "Tower.png",
    //     symbol: "event",
    //     message: "none",
    // },
    // {
    //     name: "underground Cavern",
    //     type: "normal",
    //     floors: { basement: true, ground: false, upper: false },
    //     doors: ["top", "right", "bottom", "left"],
    //     image: "Underground_Cavern.png",
    //     symbol: "event",
    //     message: `Leads to the Graveyard`,
    // },
    // {
    //     name: "underground Lake",
    //     type: "normal",
    //     floors: { basement: true, ground: false, upper: false },
    //     doors: ["top", "right"],
    //     image: "Underground_lake.png",
    //     symbol: "event",
    //     message: "none",
    // },
    // {
    //     name: "vault",
    //     type: "discover",
    //     floors: { basement: true, ground: false, upper: false },
    //     doors: ["top"],
    //     image: "Vault.png",
    //     symbol: "item",
    //     message: "none",
    //     effect: () => {
    //         handlePlayerGainsCard();
    //     },
    // },
    // {
    //     name: "winter Bedroom",
    //     type: "normal",
    //     floors: { basement: false, ground: true, upper: true },
    //     doors: ["top", "right"],
    //     image: "Winter_Bedroom.png",
    //     symbol: "omen",
    //     message: "none",
    // },
];

export default tiles;
