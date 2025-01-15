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
        name: "Hallway",
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
        name: "Ground Floor Staircase",
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
        name: "",
        floors: {basement: true, ground: true, upper: false},
        doorConfig: "",
        symbol: "",
        message: "",

    }
];

export { initialTiles, tiles };
