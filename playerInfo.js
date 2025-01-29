let playerInfo = [
    {
        name: "Sammy Angler",
        color: "green",
        stats: { speed: 5, might: 4, knowledge: 3, sanity: 4 },
        sliders: {
            speed: [0, 2, 3, 4, 4, 5, 6, 7, 8],
            might: [0, 3, 3, 4, 4, 5, 5, 6, 8],
            knowledge: [0, 2, 3, 3, 4, 5, 6, 7, 8],
            sanity: [0, 2, 3, 4, 4, 5, 6, 6, 7],
        },
    },
    {
        name: "Josef 'Brosef' Hooper",
        color: "red",
        stats: { speed: 4, might: 5, knowledge: 3, sanity: 4 },
        sliders: {
            speed: [0, 2, 2, 3, 4, 5, 6, 7, 8],
            might: [0, 4, 4, 4, 5, 6, 7, 8, 8],
            knowledge: [0, 2, 2, 3, 3, 5, 5, 6, 6],
            sanity: [0, 2, 3, 4, 4, 5, 5, 6, 6],
        },
    },
    {
        name: "Michelle Monroe",
        color: "purple",
        stats: { speed: 4, might: 5, knowledge: 4, santiy: 3 },
        sliders: {
            speed: [0, 3, 3, 4, 5, 6, 6, 7, 8],
            might: [0, 2, 3, 4, 4, 5, 6, 7, 8],
            knowledge: [0, 2, 3, 3, 4, 5, 6, 7, 8],
            sanity: [0, 2, 3, 3, 4, 5, 6, 6, 6],
        },
    },
    {
        name: "Isa Valencia",
        color: "yellow",
        stats: { speed: 5, might: 3, knowledge: 4, sanity: 4 },
        sliders: {
            speed: [0, 4, 4, 5, 5, 6, 7, 8, 8],
            might: [0, 2, 3, 3, 3, 4, 5, 6, 7],
            knowledge: [0, 2, 3, 4, 4, 5, 6, 6, 6],
            sanity: [0, 2, 3, 4, 5, 6, 7, 7, 8],
        },
    },
    {
        name: "Stephanie Richter",
        color: "skyblue",
        stats: { speed: 3, might: 4, knowledge: 4, sanity: 5 },
        sliders: {
            speed: [0, 2, 3, 3, 5, 5, 6, 6, 7],
            might: [0, 2, 3, 3, 4, 5, 5, 6, 6],
            knowledge: [0, 2, 3, 4, 4, 4, 5, 6, 6],
            sanity: [0, 4, 4, 5, 5, 6, 7, 8, 8],
        },
    },
    {
        name: "Father Warren Leung",
        color: "white",
        stats: { speed: 4, might: 3, knowledge: 4, sanity: 5 },
        sliders: {
            speed: [0, 2, 3, 4, 4, 5, 5, 6, 6],
            might: [0, 2, 2, 3, 3, 4, 5, 6, 6],
            knowledge: [0, 3, 3, 4, 5, 5, 6, 7, 8],
            sanity: [0, 3, 3, 3, 4, 5, 6, 7, 8],
        },
    },

    {
        name: "Jaden Jones",
        color: "green",
        stats: { speed: 4, might: 3, knowledge: 5, sanity: 4 },
        sliders: {
            speed: [0, 3, 4, 4, 4, 5, 6, 7, 8],
            might: [0, 2, 3, 3, 3, 4, 5, 6, 7],
            knowledge: [0, 3, 3, 4, 5, 5, 6, 6, 7],
            sanity: [0, 3, 3, 4, 5, 5, 6, 7, 8],
        },
    },
    {
        name: "Oliver Swift",
        color: "red",
        stats: { speed: 5, might: 4, knowledge: 4, sanity: 3 },
        sliders: {
            speed: [0, 3, 3, 4, 5, 5, 6, 7, 8],
            might: [0, 3, 3, 4, 4, 5, 6, 6, 7],
            knowledge: [0, 3, 3, 3, 4, 5, 6, 6, 7],
            sanity: [0, 2, 3, 3, 4, 5, 5, 6, 7],
        },
    },
    {
        name: "Brittani 'Beat Box' Bowen",
        color: "purple",
        stats: { speed: 3, might: 5, knowledge: 4, santiy: 4 },
        sliders: {
            speed: [0, 2, 3, 3, 4, 4, 5, 6, 6],
            might: [0, 3, 3, 4, 5, 6, 7, 7, 8],
            knowledge: [0, 3, 3, 4, 5, 5, 6, 6, 7],
            sanity: [0, 3, 3, 4, 4, 5, 6, 6, 7],
        },
    },
    {
        name: "Anita Hernandez",
        color: "yellow",
        stats: { speed: 4, might: 4, knowledge: 5, sanity: 3 },
        sliders: {
            speed: [0, 2, 3, 4, 4, 5, 6, 7, 8],
            might: [0, 2, 2, 3, 4, 4, 5, 6, 7],
            knowledge: [0, 4, 4, 5, 5, 6, 7, 8, 8],
            sanity: [0, 2, 2, 3, 4, 5, 5, 6, 6],
        },
    },
    {
        name: "Persephone Puleri",
        color: "skyblue",
        stats: { speed: 4, might: 4, knowledge: 3, sanity: 5 },
        sliders: {
            speed: [0, 3, 3, 4, 4, 5, 6, 7, 8],
            might: [0, 3, 3, 4, 5, 6, 6, 7, 7],
            knowledge: [0, 2, 3, 3, 4, 5, 6, 6, 7],
            sanity: [0, 3, 3, 4, 5, 6, 7, 8, 8],
        },
    },
    {
        name: "Dan Nguyen, M.D.",
        color: "white",
        stats: { speed: 3, might: 4, knowledge: 5, sanity: 4 },
        sliders: {
            speed: [0, 2, 3, 3, 4, 5, 6, 7, 7],
            might: [0, 3, 3, 4, 4, 5, 5, 6, 7],
            knowledge: [0, 3, 3, 4, 5, 5, 6, 7, 8],
            sanity: [0, 2, 3, 4, 4, 5, 6, 7, 8],
        },
    },
];

export default playerInfo;
