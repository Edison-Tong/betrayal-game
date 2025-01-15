let initialTiles = [
    {
        name: "Basement Landing",
        type: "starting",
        floor: "basement",
        doors: {
            north: true,
            east: true,
            south: true,
            west: true,
        },
        row: 6,
        col: 6,
    },
    {
        name: "Entrance Hall",
        type: "starting",
        floor: "ground",
        doors: {
            north: true,
            east: true,
            south: false,
            west: true,
        },
        row: 10,
        col: 6,
    },
    {
        name: "Foyer",
        type: "starting",
        floor: "ground",
        doors: {
            north: true,
            east: true,
            south: true,
            west: true,
        },
        row: 9,
        col: 6,
    },
    {
        name: "Grand Staircase",
        type: "starting",
        floor: "ground",
        doors: {
            north: false,
            east: false,
            south: true,
            west: false,
        },
        row: 8,
        col: 6,
    },
    {
        name: "Upper Landing",
        type: "starting",
        floor: "upper",
        doors: {
            north: true,
            east: true,
            south: true,
            west: true,
        },
        row: 6,
        col: 6,
    },
];

let tiles = [
    {
        name: "Abandoned Room",
        type: "generic",
        floors: { basement: true, ground: true, upper: true },
        doors: { north: true, east: false, south: true, west: true },
    },
    {
        name: "Balcony",
        type: "generic",
        floors: { basement: false, ground: false, upper: true },
        doors: { north: true, east: true, south: false, west: false },
    },
    {
        name: "Chapel",
        type: "event",
        floors: { basement: true, ground: true, upper: true },
        doors: { north: true, east: true, south: false, west: true },
    },
    {
        name: "Charred Room",
        type: "event",
        floors: { basement: true, ground: true, upper: false },
        doors: { north: false, east: true, south: true, west: true },
    },
    {
        name: "Dining Room",
        type: "item",
        floors: { basement: false, ground: true, upper: false },
        doors: { north: true, east: true, south: false, west: true },
    },
    {
        name: "Game Room",
        type: "event",
        floors: { basement: false, ground: true, upper: true },
        doors: { north: true, east: true, south: true, west: false },
    },
    {
        name: "Gardens",
        type: "event",
        floors: { basement: false, ground: true, upper: false },
        doors: { north: true, east: false, south: true, west: true },
    },
    {
        name: "Gymnasium",
        type: "item",
        floors: { basement: false, ground: true, upper: true },
        doors: { north: true, east: true, south: false, west: true },
    },
    {
        name: "Junk Room",
        type: "event",
        floors: { basement: true, ground: true, upper: true },
        doors: { north: false, east: true, south: true, west: true },
    },
    {
        name: "Kitchen",
        type: "omen",
        floors: { basement: true, ground: true, upper: false },
        doors: { north: true, east: true, south: false, west: true },
    },
    {
        name: "Larder",
        type: "item",
        floors: { basement: true, ground: false, upper: false },
        doors: { north: true, east: false, south: false, west: true },
    },
    {
        name: "Library",
        type: "event",
        floors: { basement: false, ground: true, upper: true },
        doors: { north: true, east: true, south: false, west: true },
    },
    {
        name: "Mystic Elevator",
        type: "special",
        floors: { basement: true, ground: true, upper: true },
        doors: { north: true, east: false, south: true, west: true },
    },
    {
        name: "Operating Laboratory",
        type: "item",
        floors: { basement: true, ground: true, upper: false },
        doors: { north: false, east: true, south: true, west: true },
    },
    {
        name: "Organ Room",
        type: "event",
        floors: { basement: true, ground: false, upper: true },
        doors: { north: true, east: false, south: true, west: true },
    },
    {
        name: "Pentagram Chamber",
        type: "omen",
        floors: { basement: false, ground: false, upper: true },
        doors: { north: true, east: false, south: true, west: false },
    },
    {
        name: "Statuary Corridor",
        type: "item",
        floors: { basement: true, ground: true, upper: true },
        doors: { north: true, east: true, south: true, west: true },
    },
    {
        name: "Storeroom",
        type: "event",
        floors: { basement: true, ground: true, upper: false },
        doors: { north: true, east: false, south: true, west: true },
    },
    {
        name: "Tower",
        type: "item",
        floors: { basement: false, ground: true, upper: true },
        doors: { north: true, east: true, south: false, west: true },
    },
    {
        name: "Vault",
        type: "event",
        floors: { basement: true, ground: true, upper: true },
        doors: { north: true, east: true, south: true, west: true },
    },
    {
        name: "Conservatory",
        type: "event",
        floors: { basement: false, ground: true, upper: false },
        doors: { north: true, east: false, south: true, west: true },
    },
    {
        name: "Graveyard",
        type: "event",
        floors: { basement: false, ground: true, upper: false },
        doors: { north: true, east: false, south: false, west: true },
    },
    {
        name: "Patio",
        type: "event",
        floors: { basement: false, ground: true, upper: false },
        doors: { north: true, east: true, south: false, west: true },
    },
    {
        name: "Servants' Quarters",
        type: "item",
        floors: { basement: false, ground: true, upper: false },
        doors: { north: false, east: true, south: true, west: false },
    },
    {
        name: "Wine Cellar",
        type: "event",
        floors: { basement: true, ground: false, upper: false },
        doors: { north: true, east: false, south: true, west: true },
    },
    {
        name: "Collapse Room",
        type: "event",
        floors: { basement: true, ground: true, upper: false },
        doors: { north: false, east: true, south: true, west: true },
    },
    {
        name: "Drawing Room",
        type: "event",
        floors: { basement: false, ground: true, upper: false },
        doors: { north: true, east: true, south: true, west: true },
    },
    {
        name: "Laboratory",
        type: "item",
        floors: { basement: true, ground: true, upper: false },
        doors: { north: true, east: true, south: true, west: false },
    },
    {
        name: "Mudroom",
        type: "event",
        floors: { basement: true, ground: true, upper: false },
        doors: { north: true, east: false, south: true, west: true },
    },
    {
        name: "Attic",
        type: "item",
        floors: { basement: false, ground: false, upper: true },
        doors: { north: true, east: false, south: false, west: true },
    },
    {
        name: "Bedroom",
        type: "event",
        floors: { basement: false, ground: false, upper: true },
        doors: { north: true, east: true, south: false, west: true },
    },
    {
        name: "Bloody Room",
        type: "omen",
        floors: { basement: false, ground: false, upper: true },
        doors: { north: false, east: true, south: true, west: true },
    },
    {
        name: "Master Bedroom",
        type: "item",
        floors: { basement: false, ground: false, upper: true },
        doors: { north: true, east: true, south: false, west: true },
    },
    {
        name: "Nursery",
        type: "event",
        floors: { basement: false, ground: false, upper: true },
        doors: { north: true, east: true, south: false, west: false },
    },
    {
        name: "Basement Stairs",
        type: "none",
        floors: { basement: false, ground: true, upper: false },
        doors: { north: false, east: false, south: true, west: false },
    },
];

export { initialTiles, tiles };
