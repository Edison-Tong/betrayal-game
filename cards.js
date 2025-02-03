let cards = [
  {
    name: "armor",
    type: "omen",
    ability:
      "Whenever you take any physical damage, reduce that damage by 1. <br> (the Armor doesn't prevent General damage or the direct loss of Might and/or Speed)",
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
    ability: "When you use the Dagger to attack, lose one speed. Roll 2 extra dice on the attack.",
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
      "Whenever you discover a tile, you may choose to bury it and discover the next tile instead. <br> If you do this, do not resolve any effects for the first tile.",
  },
  {
    name: "idol",
    type: "omen",
    ability: "Add 1 to the result of your Might rolls",
    special: "When you discover a tile with an Event symbol, you may choose to not draw an Event card.",
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
      "If someonthing would cause your explorer to die, first roll 3 dice. <br> 4-6: Instead of dying, set all your traits to critical. <br> 0-3 You die as normal.",
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
    ability: "Whenever you take Physical or Mental damage, you may instead take it as General damage.",
  },

  {
    name: "chainsaw",
    type: "item",
    weapon: true,
    ability: "When you use the Chainsaw to attack, add one die to your attack.",
  },
  {
    name: "creepy Doll",
    type: "item",
    weapon: false,
    ability:
      "Once during your turn, you may use the Creep Doll to reroll all dice on a trait roll you just made. <br> Then lose one sanity",
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
      "You may use the Dynamite in place of a regular attack. To do so, bury the Dynamite and then choose your tile or an adacent one. Everyone on the chosen tile must make a Speed roll. <br> 4+: Nothing happens. <br> 0-3: Take 4 physical damage.",
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
      "Whenever you take mental damage, reduce that damage by 1. <br> (the Headphones don't prevent General damage or the direct loss of Knowledge and/or Sanity)",
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
    ability: " When you use the Machete to attack, add 1 to the result of your roll.",
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
    ability: "On your turn, you may bury the Map. If you do, place your explorer on any tile.",
  },
  {
    name: "mirror",
    type: "item",
    weapon: false,
    ability: " On your turn, you may bury the Mirror. If you do, heal your Knowledge and Sanity.",
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
    ability: "At the end of your turn, you may gain 1 in  critical trait of your choice.",
  },
  {
    name: "rabbits Foot",
    type: "item",
    weapon: false,
    ability: "Once during your turn, you may use the Rabbit's Foot to reroll one die that you just rolled.",
  },
  {
    name: "skeleton Key",
    type: "item",
    weapon: false,
    ability:
      "You may move through walls. Whenever you do so, roll a die. If you roll a blank, bury the Skeleton Key. <br> You may not use the Skeleton Key to discover new rooms.",
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
    ability: "On your turn, you may bury the Strange Medicine. If you do, heal your Might and your Speed.",
  },
];

export default cards;
