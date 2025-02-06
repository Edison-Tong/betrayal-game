import {
    handleDiceRoll,
    handleTraitChange,
    getPlayerChoice,
    renderPlayerStats,
    handlePlayerMovesTiles,
    handlePlayerGainsCard,
} from "./app.js";
import playerInfo from "./playerInfo.js";

let cards = [
    {
        name: "armor",
        type: "omen",
        ability:
            "Whenever you take any physical damage, reduce that damage by 1. <br><br> (the Armor doesn't prevent General damage or the direct loss of Might and/or Speed)",
    },
    {
        name: "book",
        type: "omen",
        ability: "Add 1 to the result of your knowledge rolls",
        special:
            "Once during your turn, you may use the book to lose 1 Sanity. On the next trait roll you make this turn that isn't an attack, you may use your knowledge in place of the named trait.",
    },
    {
        name: "dagger",
        type: "omen",
        ability:
            "When you use the Dagger to attack, lose one speed. Roll 2 extra dice on the attack.",
    },
    {
        name: "dog",
        type: "omen",
        ability: "Add 1 to the result of your speed rolls",
        special:
            "Once during your turn, you may use the Dog to trade any number of Items or Omens with another player up to 4 tiles away, using normal trading rulles.",
    },
    {
        name: "holy Symbol",
        type: "omen",
        ability: "Add 1 to the result of your Sanity rolls.",
        special:
            "Whenever you discover a tile, you may choose to bury it and discover the next tile instead. <br><br> If you do this, do not resolve any effects for the first tile.",
    },
    {
        name: "idol",
        type: "omen",
        ability: "Add 1 to the result of your Might rolls",
        special:
            "When you discover a tile with an Event symbol, you may choose to not draw an Event card.",
    },
    {
        name: "mask",
        type: "omen",
        ability: "Add 1 to the result of your speed rolls",
        spceial:
            "Once during your turn, you may use the Mask to move everyone else on your tile (explorers and monsters) to any adjacent tiles. This effect may not be used to discover new tiles",
    },
    {
        name: "ring",
        type: "omen",
        ability: "add one to the result of your sanity rolls",
        special:
            "When you use the ring to attack, you and the defender each roll Sanity instead of might. The loser takes Mental damage.",
    },
    {
        name: "skull",
        type: "omen",
        ability: "Add 1 to the result of your knowledge rolls.",
        special:
            "If someonthing would cause your explorer to die, first roll 3 dice. <br><br> 4-6: Instead of dying, set all your traits to critical. <br><br> 0-3 You die as normal.",
    },

    {
        name: "angels Feather",
        type: "item",
        weapon: false,
        ability:
            "When you are required to make a trait roll, you may instead bury the Angles Feather. If you do, choose a number from 0-8. Use that number as the result of the required roll.",
    },
    {
        name: "brooch",
        type: "item",
        weapon: false,
        ability:
            "Whenever you take Physical or Mental damage, you may instead take it as General damage.",
    },

    {
        name: "chainsaw",
        type: "item",
        weapon: true,
        ability:
            "When you use the Chainsaw to attack, add one die to your attack.",
    },
    {
        name: "creepy Doll",
        type: "item",
        weapon: false,
        ability:
            "Once during your turn, you may use the Creep Doll to reroll all dice on a trait roll you just made. <br><br> Then lose one sanity",
    },
    {
        name: "crossbow",
        type: "item",
        weapon: true,
        ability:
            "When you use the Crossow to attack, you may attack any character on your tile or an adjacet tile. You and the defender each roll Speed. Roll one extra die on attack. If you lose you take no damage. ",
    },
    {
        name: "dynamite",
        type: "item",
        weapon: true,
        ability:
            "You may use the Dynamite in place of a regular attack. To do so, bury the Dynamite and then choose your tile or an adacent one. Everyone on the chosen tile must make a Speed roll. <br><br> 4+: Nothing happens. <br><br> 0-3: Take 4 physical damage.",
    },
    {
        name: "first Aid Kit",
        type: "item",
        weapon: false,
        ability:
            "On your turn, you may bury the First Aid Kit. If you do, heal all of your critical traits. You may use the First Aid Kit to heal another explorer on your tile.",
    },
    {
        name: "flashlight",
        type: "item",
        weapon: false,
        ability: "During Events, you may roll 2 extra dice on trait rolls.",
    },
    {
        name: "gun",
        type: "item",
        weapon: true,
        ability:
            "When you use the Gun to attck, you may attack any target in line of sight. Your and the defender each roll Speed. If your lose, you take no damage.",
    },
    {
        name: "headphones",
        type: "item",
        weapon: false,
        ability:
            "Whenever you take mental damage, reduce that damage by 1. <br><br> (the Headphones don't prevent General damage or the direct loss of Knowledge and/or Sanity)",
    },
    {
        name: "leather Jacket",
        type: "item",
        weapon: false,
        ability: "Roll an extra die whenever you defend against an attack.",
    },
    {
        name: "lucky Coin",
        type: "item",
        weapon: false,
        ability:
            "Once during your turn, you may use the Lucky Coin to reroll all blank dice on a trait roll that you just made. For each blank die on the reroll, take 1 mental damage.",
    },
    {
        name: "machete",
        type: "item",
        weapon: true,
        ability:
            " When you use the Machete to attack, add 1 to the result of your roll.",
    },
    {
        name: "magic Camera",
        type: "item",
        weapon: false,
        ability: "You may use your Sanity to make Knowledge rolls.",
    },
    {
        name: "map",
        type: "item",
        weapon: false,
        ability:
            "On your turn, you may bury the Map. If you do, place your explorer on any tile.",
    },
    {
        name: "mirror",
        type: "item",
        weapon: false,
        ability:
            " On your turn, you may bury the Mirror. If you do, heal your Knowledge and Sanity.",
    },
    {
        name: "mystical Stopwatch",
        type: "item",
        weapon: false,
        ability:
            "On your turn, you may bury the Stopwatch. If you do, take another turn after this one. You may only use this ability after the haunt has started. ",
    },
    {
        name: "necklace Of Teeth",
        type: "item",
        weapon: false,
        ability:
            "At the end of your turn, you may gain 1 in  critical trait of your choice.",
    },
    {
        name: "rabbits Foot",
        type: "item",
        weapon: false,
        ability:
            "Once during your turn, you may use the Rabbit's Foot to reroll one die that you just rolled.",
    },
    {
        name: "skeleton Key",
        type: "item",
        weapon: false,
        ability:
            "You may move through walls. Whenever you do so, roll a die. If you roll a blank, bury the Skeleton Key. <br><br> You may not use the Skeleton Key to discover new rooms.",
    },
    {
        name: "strange Amulet",
        type: "item",
        weapon: false,
        ability: "Whenever you take Physical damage, gain 1 Sanity.",
    },
    {
        name: "strange Medicine",
        type: "item",
        weapon: false,
        ability:
            "On your turn, you may bury the Strange Medicine. If you do, heal your Might and your Speed.",
    },

    // {
    //     name: "a bite!",
    //     type: "event",
    //     todo: "Make a Might roll",
    //     result: "4+: Nothing happens. <br><br> 2-3: Take 1 Physical damage. <br><br> 0-1: Take 3 Physical damage.",
    //     effect: async (player) => {
    //         let test = await handleDiceRoll(player.stats.might);

    //         let roll = await handleDiceRoll(player.stats.might);
    //         if (roll <= 1) {
    //             handleTraitChange("physical", 3, "lose");
    //         } else if (roll <= 3) {
    //             handleTraitChange("physical", 1, "lose");
    //         } else if (roll >= 4) {
    //             console.log("nothing");
    //         }
    //     },
    // },

    // {
    //     name: "a cry for help",
    //     type: "event",
    //     todo: "Make a Knowledge roll",
    //     result: "4+: Place your explorer on any tile in your region. <br><br> 0-3: Take 1 Mental damage",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.knowledge);
    //         if (roll <= 3) {
    //             handleTraitChange("mental", 1, "lose");
    //         } else {
    //             console.log("Place your explorer on any tile in your region"); //UNFINISHED
    //         }
    //     },
    // },
    // {
    //     name: "a full table",
    //     type: "event",
    //     todo: "Make a Knowledge or Sanity roll",
    //     result: "5+: Gain 1 Speed. <br><br> 0-4: Take 1 General damage.",
    //     effect: async (player) => {
    //         let trait = await getPlayerChoice(
    //             ["knowledge", "sanity"],
    //             "Do you want to roll with Knowledge or Sanity?"
    //         );
    //         let roll = await handleDiceRoll(player.stats[trait]);
    //         if (roll <= 4) {
    //             handleTraitChange("general", 1, "lose");
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.speed.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "alien geometry",
    //     type: "event",
    //     todo: "Make a Knowledge roll",
    //     result: " 4+: Gain 1 Sanity. <br><br> 0-3: Lose 1 Speed",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.knowledge);
    //         if (roll <= 3) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.speed.index--;
    //             renderPlayerStats();
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "a moment of hope",
    //     type: "event",
    //     todo: "Place a blessing token on your tile.",
    //     result: "A hero on the same tile as the blessing token must roll an extra die on all trait rolls",
    //     effect: async (player) => {
    //         console.log("place a blessing token"); //UNFINISHED
    //     },
    // },
    // {
    //     name: "an eerie feeling",
    //     type: "event",
    //     todo: "Roll 2 dice.",
    //     result: "4: Nothing happens. <br><br> 3: Lose 1 speed. <br><br> 2: Lose 1 Sanity. <br><br> 1: lose 1 Knowledge. <br><br> 0: Lose 1 Might.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(2);
    //         if (roll === 0) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.might.index--;
    //             renderPlayerStats();
    //         } else if (roll === 1) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.knowledge.index--;
    //             renderPlayerStats();
    //         } else if (roll === 2) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index--;
    //             renderPlayerStats();
    //         } else if (roll === 3) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.speed.index--;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "a secret passage",
    //     type: "event",
    //     todo: "Place a secret passage token on your tile. <br><br> Make a Knowledge roll.",
    //     result: "5+: Place another secret Passage token on any other tile. Gain 1 knowledge. <br><br> 3-4: Place another Secret Passage token on any Ground Floor tile. <br><br> 0-2: Place another Secret Passage token on any Basement Tile. Lose 1 Sanity.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.knowledge);
    //         if (roll <= 2) {
    //             console.log(
    //                 "Place another Secret Passage token on any Basement Tile."
    //             ); // UNFINISHED
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index--;
    //             renderPlayerStats();
    //         } else if (roll <= 4) {
    //             console.log(
    //                 "Place another Secret Passage token on any Ground Floor tile"
    //             ); // UNFINISHED
    //         } else {
    //             console.log(
    //                 "Place another secret Passage token on any other tile."
    //             ); // UNFINISHED
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.knowledge.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "a splash of crimson",
    //     type: "event",
    //     todo: "If the haunt has not started, you may make a haunt roll",
    //     result: "5+: Turn to haunt 1 in the TRAITORS TOME. You are the traitor. <br><br> 0-4: Gain 1 Speed. <br><br><br> If the haunt has started or if you choose not to make a haunt roll, take one die of Physical damage.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let answer = await getPlayerChoice(
    //             ["yes", "no"],
    //             "Do you want to make a haunt roll?"
    //         );
    //         if (hauntStarted === true || answer === "no") {
    //             let roll = await handleDiceRoll(1);
    //             handleTraitChange("physical", roll, "lose");
    //         } else if (true) {
    //             let roll = await handleDiceRoll(hauntValue);
    //             if (roll <= 4) {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo.speed.index++;
    //                 renderPlayerStats();
    //             } else {
    //                 console.log("Start Haunt #1"); // UNFINISHED
    //             }
    //         }
    //     },
    // },
    // {
    //     name: "a vial of dust",
    //     type: "event",
    //     todo: "If the haunt has not started, you may make a haunt roll",
    //     result: "5+: Turn to haunt 3 in the TRAITORS TOME. You are the haunt revealer. <br><br> 0-4: Gain 1 Sanity. <br><br><br> If the haunt has started or if you choose not to make a haunt roll, lose 1 Might and gain 1 Sanity.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let answer = await getPlayerChoice(
    //             ["yes", "no"],
    //             "Do you want to make a haunt roll?"
    //         );
    //         if (hauntStarted === true || answer === "no") {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.might.index--;
    //             playerStatsInfo.sanity.index++;
    //             renderPlayerStats();
    //         } else if (true) {
    //             let roll = await handleDiceRoll(hauntValue);
    //             if (roll <= 4) {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo.sanity.index++;
    //                 renderPlayerStats();
    //             } else {
    //                 console.log("Start Haunt #3"); // UNFINISHED
    //             }
    //         }
    //     },
    // },
    // {
    //     name: "bat out of hell",
    //     type: "event",
    //     todo: "Make a Speed roll",
    //     result: "4+: Place your explorer on an adjacent tile. <br><br> 0-3: Take 1 Physical damage.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.speed);
    //         if (roll <= 3) {
    //             handleTraitChange("physical", 1, "lose");
    //         } else {
    //             console.log("place explorer on an adjacent tile"); // UNFINISHED
    //         }
    //     },
    // },
    // {
    //     name: "behind you!",
    //     type: "event",
    //     todo: "Make a Speed roll",
    //     result: "4+: Gain 1 Sanity. <br><br> 0-3: Take 1 Physical damage.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.speed);
    //         if (roll <= 3) {
    //             handleTraitChange("physical", 1, "lose");
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "brain food",
    //     type: "event",
    //     todo: "Make a Might roll",
    //     result: "5+: Gain 1 Might or Speed. <br><br> 1-4: Gain 1 Speed and lose 1 Sanity. <br><br> 0: Take 2 General damage.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.might);

    //         if (roll === 0) {
    //             handleTraitChange("general", 2, "lose");
    //         } else if (roll <= 4) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.speed.index++;
    //             playerStatsInfo.sanity.index--;
    //             renderPlayerStats();
    //         } else {
    //             handleTraitChange("physical", 1, "gain");
    //         }
    //     },
    // },
    // {
    //     name: "burning figure",
    //     type: "event",
    //     todo: "Make a Sanity roll",
    //     result: "4+: Gain 1 Sanity. <br><br> 2-3: Place your explorer on the Entrance Hall. <br><br> 0-1: Take 1 die of Physical damage and 1 die of Mental damage.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.sanity);

    //         if (roll <= 1) {
    //             let roll = await handleDiceRoll(1);
    //             await handleTraitChange("physical", roll, "lose");
    //             roll = await handleDiceRoll(1);
    //             await handleTraitChange("mental", roll, "lose");
    //         } else if (roll <= 3) {
    //             handlePlayerMovesTiles(
    //                 player.currentTile.name.replaceAll(" ", ""),
    //                 "entranceHall",
    //                 "ground"
    //             );
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "cassette player",
    //     type: "event",
    //     todo: "Make a Sanity roll",
    //     result: "4+: Gain 1 knowledge. <br><br> 0-3: Take 1 Mental damage.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.sanity);

    //         if (roll <= 3) {
    //             handleTraitChange("mental", 1, "lose");
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.knowledge.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "clown room",
    //     type: "event",
    //     todo: "Make a Sanity roll",
    //     result: "4+: Nothing happens. <br><br> 0-3: Take 2 Mental damage.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.sanity);

    //         if (roll <= 3) {
    //             handleTraitChange("mental", 2, "lose");
    //         } else {
    //             console.log("nothing happens"); // UNFINISHED SORTA
    //         }
    //     },
    // },
    // {
    //     name: "creaking door",
    //     type: "event",
    //     todo: "Make a Knowledge roll",
    //     result: "6+: Place your explorer on any Upper or Ground Floor tile. <br><br> 4-5: Place your explorer on any Ground Floor tile. <br><br> 0-3: Place your explorer on the Basement Landing tile.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.knowledge);
    //         if (roll <= 3) {
    //             console.log("Place explorer on the basement landing tile");
    //             handlePlayerMovesTiles(
    //                 player.currentTile.name.replaceAll(" ", ""),
    //                 "basementLanding",
    //                 "basement"
    //             );
    //         } else if (roll <= 5) {
    //             console.log("Place explorer on any Ground Floor tile"); // UNFINISHED
    //         } else {
    //             console.log("Place explorer on any Upper or Ground Floor tile"); // UNFINISHED
    //         }
    //     },
    // },
    // {
    //     name: "dark and stormy night",
    //     type: "event",
    //     todo: " Make a Knowledge roll",
    //     result: "4+: Gain 1 Sanity. <br><br> 0-3: Take 1 Mental damage.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.knowledge);

    //         if (roll <= 3) {
    //             handleTraitChange("mental", 1, "lose");
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "eerie mirror",
    //     type: "event",
    //     todo: "If the haunt has not started, you may make a haunt roll",
    //     result: "5+: Turn to haunt 7 in the SECRETS OF SURVIVAL book. this haunt has no traitor. you are the haunt revealer. <br><br> 0-4: Gain 1 Sanity. <br><br><br> If the haunt has started or if you choose not to make a haunt roll, draw an item card.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let answer = await getPlayerChoice(
    //             ["yes", "no"],
    //             "Do you want to make a haunt roll?"
    //         );
    //         if (hauntStarted === true || answer === "no") {
    //             handlePlayerGainsCard();
    //         } else if (true) {
    //             let roll = await handleDiceRoll(hauntValue);
    //             if (roll <= 4) {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo.sanity.index++;
    //                 renderPlayerStats();
    //             } else {
    //                 console.log("Start Haunt #7"); // UNFINISHED
    //             }
    //         }
    //     },
    // },
    // {
    //     name: "flickering lights",
    //     type: "event",
    //     todo: "Make a Speed or Might roll",
    //     result: "5+: Gain 1 Speed. <br><br> 0-4: Take one die of Physical damage.",
    //     effect: async (player) => {
    //         let trait = await getPlayerChoice(
    //             ["speed", "might"],
    //             "Do you want to roll with Speed or Might?"
    //         );
    //         let roll = await handleDiceRoll(player.stats[trait]);
    //         if (roll <= 4) {
    //             let roll = await handleDiceRoll(1);
    //             handleTraitChange("physical", roll, "lose");
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.speed.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "forbidden knowledge",
    //     type: "event",
    //     todo: "Make a Sanity roll",
    //     result: "4+: Gain 1 Knowledge. <br><br> 2-3: Gain 1 Knowledge and lose 1 Sanity. <br><br> 0-1: Take 2 Mental damage",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.sanity);

    //         if (roll <= 1) {
    //             handleTraitChange("mental", 2, "lose");
    //         } else if (roll <= 3) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.knowledge.index++;
    //             playerStatsInfo.sanity.index--;
    //             renderPlayerStats();
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.knowledge.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "funeral",
    //     type: "event",
    //     todo: "Make a Sanity roll",
    //     result: "4+: Gain 1 Sanity. <br><br> 2-3 Lose 1 Sanity. <br><br> 0-1: Lose 1 Sanity and 1 Might. <br><br><br> If the Graveyard or Catacombs tiles have been discovered, place your explorer on one of those tiles.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.sanity);
    //         console.log(
    //             "If the Graveyard or Catacombs tiles have been discovered, place your explorer on one of those tiles."
    //         ); //UNFINISHED
    //         if (roll <= 1) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index--;
    //             playerStatsInfo.might.index--;
    //             renderPlayerStats();
    //         } else if (roll <= 3) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index--;
    //             renderPlayerStats();
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "hanged man",
    //     type: "event",
    //     todo: "Roll each trait, one at a time.",
    //     result: "2+: Nothing happens. <br><br> 0-1: Lose 1 from that trait. <br><br><br> If you roll 2+ on all four rolls, gain 1 in any trait.",
    //     effect: async (player) => {
    //         let rollCount = 0;
    //         let rollsDisplay = document.createElement("div");
    //         let container = document.querySelector(".dice");
    //         container.append(rollsDisplay);
    //         for (let key in player.stats) {
    //             let roll = await handleDiceRoll(player.stats[key]);

    //             let traitRollDisplay = document.createElement("div");
    //             traitRollDisplay.classList.add("total-display");
    //             traitRollDisplay.innerHTML = `${key} roll: ${roll}`;
    //             rollsDisplay.append(traitRollDisplay); // Append to the dice area

    //             if (roll <= 1) {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo[key].index--;
    //                 renderPlayerStats();
    //             } else {
    //                 rollCount++;
    //             }
    //         }

    //         if (rollCount === 4) {
    //             await handleTraitChange("general", 1, "gain");
    //         }
    //         rollsDisplay.remove();
    //     },
    // },

    // {
    //     name: "impossible architecture",
    //     type: "event",
    //     todo: "Make a Sanity roll",
    //     result: "4+: Nothing happens. <br><br> 0-3: Take 1 die of Mental damage.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.sanity);
    //         window.alert(`You rolled: ${roll}`); //this is here for now so you can see what you rolled
    //         if (roll <= 3) {
    //             let roll = await handleDiceRoll(1);
    //             handleTraitChange("mental", roll, "lose");
    //         } else {
    //             console.log("Nothing happens"); //UNFINISHED MAYBE
    //         }
    //     },
    // },
    // {
    //     name: "jar of organs",
    //     type: "event",
    //     todo: "Make a Sanity roll",
    //     result: "4+: Draw an Item card. <br><br> 0-3: Lose 1 Might.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.sanity);
    //         if (roll <= 3) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.might.index--;
    //             renderPlayerStats();
    //         } else {
    //             handlePlayerGainsCard();
    //         }
    //     },
    // },
    // {
    //     name: "jonah's turn",
    //     type: "event",
    //     todo: "You may discard any Item card that is not a weapon.",
    //     result: "If you do, gain 1 Sanity. Otherwise, take one die of Mental damage.",
    //     effect: async (player) => {
    //         // UNFINISHED!!! FUNCTION WORKS BUT NO ITEM CARD IS ACTUALLY SWAPPED.
    //         let choice = await getPlayerChoice(
    //             ["yes", "no"],
    //             "Would you like to discard an item?"
    //         );
    //         if (choice === "yes") {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index++;
    //             renderPlayerStats();
    //         } else if (choice === "no") {
    //             let roll = await handleDiceRoll(1);
    //             handleTraitChange("mental", roll, "lose");
    //         }
    //     },
    // },
    // {
    //     name: "meat moss",
    //     type: "event",
    //     todo: "You may inhale the scent. If you do, roll 2 dice.",
    //     result: "3-4: Gain 1 in any trait. <br><br> 0-2: Take one die of Mental damage.",
    //     effect: async (player) => {
    //         let choice = await getPlayerChoice(
    //             ["yes", "no"],
    //             "Would you like to inhale the scent?"
    //         );
    //         if (choice === "yes") {
    //             let roll = await handleDiceRoll(2);
    //             window.alert(`You rolled: ${roll}`); //this is here for now so you can see what you rolled
    //             if (roll <= 2) {
    //                 let roll = await handleDiceRoll(1);
    //                 handleTraitChange("mental", roll, "lose");
    //             } else {
    //                 handleTraitChange("general", 1, "gain");
    //             }
    //         }
    //     },
    // },
    // {
    //     name: "mysterious fluid",
    //     type: "event",
    //     todo: "You may drink the fluid. If you do, roll 3 dice.",
    //     result: "6: Gain 1 in each trait. <br><br> 5: Gain 1 Might and 1 Speed. <br><br> 4: Gain 1 Knowledge and 1 Sanity. <br><br> 3: Gain 1 knowledge and lose 1 Might. <br><br> 2: Lose 1 Knowledge and 1 Sanity. <br><br> 1: Lose 1 Might and 1 Speed. <br><br> 0: Lose 1 in each trait.",
    //     effect: async (player) => {
    //         let choice = await getPlayerChoice(
    //             ["yes", "no"],
    //             "Would you like to drink the fluid?"
    //         );
    //         if (choice === "yes") {
    //             let roll = await handleDiceRoll(3);
    //             if (roll === 0) {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo.speed.index--;
    //                 playerStatsInfo.might.index--;
    //                 playerStatsInfo.knowledge.index--;
    //                 playerStatsInfo.sanity.index--;
    //                 renderPlayerStats();
    //             } else if (roll === 1) {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo.speed.index--;
    //                 playerStatsInfo.might.index--;
    //                 renderPlayerStats();
    //             } else if (roll === 2) {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo.knowledge.index--;
    //                 playerStatsInfo.sanity.index--;
    //                 renderPlayerStats();
    //             } else if (roll === 3) {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo.knowledge.index++;
    //                 playerStatsInfo.might.index--;
    //                 renderPlayerStats();
    //             } else if (roll === 4) {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo.knowledge.index++;
    //                 playerStatsInfo.sanity.index++;
    //                 renderPlayerStats();
    //             } else if (roll === 5) {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo.speed.index++;
    //                 playerStatsInfo.might.index++;
    //                 renderPlayerStats();
    //             } else {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo.speed.index++;
    //                 playerStatsInfo.might.index++;
    //                 playerStatsInfo.knowledge.index++;
    //                 playerStatsInfo.sanity.index++;
    //                 renderPlayerStats();
    //             }
    //         }
    //     },
    // },
    // {
    //     name: "phone call",
    //     type: "event",
    //     todo: "Roll 2 dice.",
    //     result: "4+: Gain 1 Sanity. <br><br> 3: Gain 1 Knowledge. <br><br> 1-2: Take one die of Mental damage. <br><br> 0: Take two dice of Physical damage.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(2);
    //         window.alert(`You rolled: ${roll}`); //this is here for now so you can see what you rolled

    //         if (roll <= 0) {
    //             let roll = await handleDiceRoll(2);
    //             handleTraitChange("mental", roll, "lose");
    //         } else if (roll <= 2) {
    //             let roll = await handleDiceRoll(1);
    //             handleTraitChange("mental", roll, "lose");
    //         } else if (roll === 3) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.knowledge.index++;
    //             renderPlayerStats();
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "poor yorick",
    //     type: "event",
    //     todo: "Make a Sanity roll.",
    //     result: "4+: Gain 1 Knowledge. <br><br> 0-3: Take 1 Mental damage.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(player.stats.sanity);

    //         if (roll <= 3) {
    //             handleTraitChange("mental", 1, "lose");
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.knowledge.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "radio broadcast",
    //     type: "event",
    //     todo: "Roll 2 dice.",
    //     result: " 3-4: Gain 1 Knowledge. <br><br> 0-2: Take one die of Mental damage.",
    //     effect: async (player) => {
    //         let roll = await handleDiceRoll(2);
    //         window.alert(`You rolled: ${roll}`); //this is here for now so you can see what you rolled
    //         if (roll <= 2) {
    //             let roll = await handleDiceRoll(1);
    //             handleTraitChange("mental", roll, "lose");
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.knowledge.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "say cheese",
    //     type: "event",
    //     todo: "If the haunt has not started, you may make a haunt roll.",
    //     result: "5+: Turn to haunt 33 in the TRAITOR'S TOME. If a hero has the Magic Camera, they are the traitor. Otherwise, you are the traitor. <br><br> 0-4: Draw an Item card. <br><br><br> If the haunt has started, or you chose not to make a haunt roll, draw an Item card.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let answer = await getPlayerChoice(
    //             ["yes", "no"],
    //             "Do you want to make a haunt roll?"
    //         );
    //         if (hauntStarted === true || answer === "no") {
    //             handlePlayerGainsCard();
    //         } else {
    //             let roll = await handleDiceRoll(hauntValue);
    //             if (roll <= 4) {
    //                 handlePlayerGainsCard();
    //             } else {
    //                 console.log("Start Haunt #7"); // UNFINISHED
    //             }
    //         }
    //     },
    // },
    // {
    //     name: "secret elevator",
    //     type: "event",
    //     todo: "You find a dumbwaiter. You may choose to crawl inside.",
    //     result: "If you do, you may place yourself on any tile in a different region",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let answer = await getPlayerChoice(
    //             ["yes", "no"],
    //             "Do you want to crawl inside?"
    //         );
    //         if (answer === "yes") {
    //             console.log("place yourself on any tile in a different region"); // UNFINISHED
    //         }
    //     },
    // },
    // {
    //     name: "severed hand",
    //     type: "event",
    //     todo: "You may take 2 Physical damage.",
    //     result: "If you do, draw an Item card.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let answer = await getPlayerChoice(
    //             ["yes", "no"],
    //             "Do you want to take 2 Physical damage?"
    //         );
    //         if (answer === "yes") {
    //             handleTraitChange("physical", 2, "lose");
    //             handlePlayerGainsCard();
    //         }
    //     },
    // },
    // {
    //     name: "spiders",
    //     type: "event",
    //     todo: "Make a Sanity roll",
    //     result: "4+: Gain 1 Sanity or Speed. Place your explorer on an adjacent tile. <br><br> 2-3: Gain 1 Speed and lose 1 Sanity. <br><br> 0-1: Lose 1 speed.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let roll = await handleDiceRoll(player.stats.sanity);

    //         if (roll <= 1) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.speed.index--;
    //             renderPlayerStats();
    //         } else if (roll <= 3) {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.speed.index++;
    //             playerStatsInfo.sanity.index--;
    //             renderPlayerStats();
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             let answer = await getPlayerChoice(
    //                 ["sanity", "speed"],
    //                 "Gain 1 Sanity or 1 Speed?"
    //             );
    //             playerStatsInfo[answer].index++;
    //             renderPlayerStats();
    //             console.log("Place your explorer on an adjacent tile."); //UNFINISHED
    //         }
    //     },
    // },
    // {
    //     name: "taxidermy",
    //     type: "event",
    //     todo: "Make a Might roll",
    //     result: "5+: Gain 1 Sanity. <br><br> 0-4: Take 1 Physical damage. Place and Obstacle token on this tile.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let roll = await handleDiceRoll(player.stats.might);
    //         if (roll <= 4) {
    //             handleTraitChange("physical", 1, "lose");
    //             console.log("Place an obstacle token on this tile"); // UNFINISHED
    //         } else {
    //             let playerStatsInfo =
    //                 playerInfo[player.id.replace("p", "")].stats;
    //             playerStatsInfo.sanity.index++;
    //             renderPlayerStats();
    //         }
    //     },
    // },
    // {
    //     name: "technical difficulties",
    //     type: "event",
    //     todo: "Place your explorer on the Landing of the Floor below. If you are already in the Basement, place your explorer on the Upper Landing instead and take 1 Mental damage.",
    //     result: "",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let currentFloor = player.currentFloor;

    //         // let roll = await handleDiceRoll(player.stats.knowledge); // PLAYER WILL NOT DSPALY CORRECTLY UNLESS THERE IS AN DELAY....
    //         setTimeout(() => {
    //             console.log("wait");
    //             if (currentFloor === "upper") {
    //                 console.log("place explorer on entrance hall");
    //                 handlePlayerMovesTiles(
    //                     player.currentTile.name.replaceAll(" ", ""),
    //                     "entranceHall",
    //                     "ground"
    //                 );
    //             } else if (currentFloor === "ground") {
    //                 console.log("place explorer on basement Landing");
    //                 handlePlayerMovesTiles(
    //                     player.currentTile.name.replaceAll(" ", ""),
    //                     "basementLanding",
    //                     "basement"
    //                 );
    //             } else if (currentFloor === "basement") {
    //                 console.log("place explorer on Upper Landing");
    //                 handlePlayerMovesTiles(
    //                     player.currentTile.name.replaceAll(" ", ""),
    //                     "upperLanding",
    //                     "upper"
    //                 );
    //                 handleTraitChange("mental", 1, "lose");
    //             }
    //         }, 0);
    //     },
    // },
    // {
    //     name: "the deepest closet",
    //     type: "event",
    //     todo: "Make a Speed roll",
    //     result: " 4+: Draw an Item card. <br><br> 1-3: Take 1 Mental damage. <br><br> 0: Take one die of Physical damage. place your explorer on the Basement Landing.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let roll = await handleDiceRoll(player.stats.speed);
    //         if (roll === 0) {
    //             handlePlayerMovesTiles(
    //                 player.currentTile.name.replaceAll(" ", ""),
    //                 "basementLanding",
    //                 "basement"
    //             );
    //             let roll = await handleDiceRoll(1);
    //             handleTraitChange("physical", roll, "lose");
    //         } else if (roll <= 3) {
    //             handleTraitChange("mental", 1, "lose");
    //         } else {
    //             handlePlayerGainsCard();
    //         }
    //     },
    // },
    // {
    //     name: "the flowering",
    //     type: "event",
    //     todo: "Take one General damage. Place your explorer on any Basement or Ground floor tile. If the Conservatory tile has been discovered, you must place your explorer there.",
    //     result: "",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         handleTraitChange("general", 1, "lose");
    //         console.log(
    //             "Place your explorer on any Basement or Ground floor tile. If the Conservatory tile has been discovered, you must place your explorer there."
    //         ); // UNFINISHED
    //     },
    // },
    // {
    //     name: "the house is hungry",
    //     type: "event",
    //     todo: "If the haunt has not started, you may make a haunt roll.",
    //     result: "5+: Turn to haunt 12 in the TRAITOR'S TOME. This haunt has no traitor. You are the haunt revealer. <br><br> 0-4: Gain 1 Might. <br><br><br> If the haunt has starter or you chose not to make a haunt roll, gain 1 in any trait.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let answer = await getPlayerChoice(
    //             ["yes", "no"],
    //             "Do you want to make a haunt roll?"
    //         );
    //         if (hauntStarted === true || answer === "no") {
    //             handleTraitChange("general", 1, "gain");
    //         } else {
    //             let roll = await handleDiceRoll(hauntValue);
    //             if (roll <= 4) {
    //                 let playerStatsInfo =
    //                     playerInfo[player.id.replace("p", "")].stats;
    //                 playerStatsInfo.might.index++;
    //                 renderPlayerStats();
    //             } else {
    //                 console.log("Start Haunt #12"); // UNFINISHED
    //             }
    //         }
    //     },
    // },
    // {
    //     name: "the oldest hosue",
    //     type: "event",
    //     todo: "Make a Speed or Might roll",
    //     result: "5+: Place your explorer on any tile. <br><br> 3-4: Place your explorer on any Ground Floor tile. Take 1 General damage. <br><br> 0-2: Place your explorer on any Basement tile. Take 1 Mental damage.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let answer = await getPlayerChoice(
    //             ["speed", "might"],
    //             "Do you want to roll with Speed or Might?"
    //         );
    //         let roll = await handleDiceRoll(player.stats[answer]);
    //         if (roll <= 2) {
    //             handleTraitChange("mental", 1, "lose");
    //             console.log("Place your explorer on any Basement tile"); // UNFINISHED
    //         } else if (roll <= 4) {
    //             handleTraitChange("general", 1, "lose");
    //             console.log("Place your explorer on any Ground Floor tile"); // UNFINISHED
    //         } else {
    //             console.log("Place your explorer on any tile"); // UNFINISHED
    //         }
    //     },
    // },
    {
        name: "The stars at night",
        type: "event",
        todo: "Choose a trait to roll",
        result: "5+: Gain 1 in the chosen trait. <br><br> 4: Lose 1 in the chosen trait. <br><br> 0-3: Heal the chosen trait.",
        effect: async (player, hauntValue, hauntStarted) => {
            let answer = await getPlayerChoice(
                ["speed", "might", "knowledge", "sanity"],
                "Choose a trait to roll."
            );
            let roll = await handleDiceRoll(player.stats[answer]);
            if (roll <= 10) {
                let playerStatsInfo =
                    playerInfo[player.id.replace("p", "")].stats;
                if (
                    playerStatsInfo[answer].index <
                    playerStatsInfo[answer].startingIndex
                ) {
                    playerStatsInfo[answer].index =
                        playerStatsInfo[answer].startingIndex;
                    renderPlayerStats();
                }
            } else if (roll === 4) {
                let playerStatsInfo =
                    playerInfo[player.id.replace("p", "")].stats;
                playerStatsInfo[answer].index--;
                renderPlayerStats();
            } else {
                let playerStatsInfo =
                    playerInfo[player.id.replace("p", "")].stats;
                playerStatsInfo[answer].index++;
                renderPlayerStats();
            }
        },
    },
    // {
    //     name: "tiny robot",
    //     type: "event",
    //     todo: "Make a knowledge roll",
    //     result: "5+: Draw an Item card <br><br> 0-4: Take one die of Physical damage.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let roll = await handleDiceRoll(player.stats.knowledge);
    //         if (roll <= 4) {
    //             let roll = await handleDiceRoll(1);
    //             handleTraitChange("physical", roll, "lose");
    //         } else {
    //             handlePlayerGainsCard();
    //         }
    //     },
    // },
    // {
    //     name: "wandering ghost",
    //     type: "event",
    //     todo: "You may bury one of your items. If you do, gain 1 in any trait. Otherwise, make a Sanity roll.",
    //     result: "4+: Draw an Item card <br><br> 0-3: Take 1 General damage.",
    //     effect: async (player, hauntValue, hauntStarted) => {
    //         let answer = await getPlayerChoice(
    //             ["yes", "no"],
    //             "Do you want to bury an Item?"
    //         );
    //         if (answer === "yes") {
    //             handleTraitChange("general", 1, "gain"); //UNFINISHED CANNOT BURY ITEMS YET
    //         } else {
    //             let roll = await handleDiceRoll(player.stats.sanity);
    //             if (roll <= 3) {
    //                 handleTraitChange("general", 1, "lose");
    //             } else {
    //                 handlePlayerGainsCard();
    //             }
    //         }
    //     },
    // },
];

export default cards;
