let playerInfo = [
  {
    name: "Sammy Angler",
    color: "green",
    stats: {
      speed: { index: 5, slider: [0, 2, 3, 4, 4, 5, 6, 7, 8], startingIndex: 5 },
      might: { index: 3, slider: [0, 3, 3, 4, 4, 5, 5, 6, 8], startingIndex: 3 },
      knowledge: { index: 3, slider: [0, 2, 3, 3, 4, 5, 6, 7, 8], startingIndex: 3 },
      sanity: { index: 4, slider: [0, 2, 3, 4, 4, 5, 6, 6, 7], startingIndex: 4 },
    },
  },
  {
    name: "Josef 'Brosef' Hooper",
    color: "red",
    stats: {
      speed: { index: 4, slider: [0, 2, 2, 3, 4, 5, 6, 7, 8], startingIndex: 4 },
      might: { index: 4, slider: [0, 4, 4, 4, 5, 6, 7, 8, 8], startingIndex: 4 },
      knowledge: { index: 3, slider: [0, 2, 2, 3, 3, 5, 5, 6, 6], startingIndex: 3 },
      sanity: { index: 3, slider: [0, 2, 3, 4, 4, 5, 5, 6, 6], startingIndex: 3 },
    },
  },
  {
    name: "Michelle Monroe",
    color: "purple",
    stats: {
      speed: { index: 3, slider: [0, 3, 3, 4, 5, 6, 6, 7, 8], startingIndex: 3 },
      might: { index: 5, slider: [0, 2, 3, 4, 4, 5, 6, 7, 8], startingIndex: 5 },
      knowledge: { index: 4, slider: [0, 2, 3, 3, 4, 5, 6, 7, 8], startingIndex: 4 },
      sanity: { index: 3, slider: [0, 2, 3, 3, 4, 5, 6, 6, 6], startingIndex: 3 },
    },
  },
  {
    name: "Isa Valencia",
    color: "yellow",
    stats: {
      speed: { index: 4, slider: [0, 4, 4, 5, 5, 6, 7, 8, 8], startingIndex: 4 },
      might: { index: 4, slider: [0, 2, 3, 3, 3, 4, 5, 6, 7], startingIndex: 4 },
      knowledge: { index: 3, slider: [0, 2, 3, 4, 4, 5, 6, 6, 6], startingIndex: 3 },
      sanity: { index: 3, slider: [0, 2, 3, 4, 5, 6, 7, 7, 8], startingIndex: 3 },
    },
  },
  {
    name: "Stephanie Richter",
    color: "skyblue",
    stats: {
      speed: { index: 3, slider: [0, 2, 3, 3, 5, 5, 6, 6, 7], startingIndex: 3 },
      might: { index: 4, slider: [0, 2, 3, 3, 4, 5, 5, 6, 6], startingIndex: 4 },
      knowledge: { index: 3, slider: [0, 2, 3, 4, 4, 4, 5, 6, 6], startingIndex: 3 },
      sanity: { index: 4, slider: [0, 4, 4, 5, 5, 6, 7, 8, 8], startingIndex: 4 },
    },
  },
  {
    name: "Father Warren Leung",
    color: "white",
    stats: {
      speed: { index: 3, slider: [0, 2, 3, 4, 4, 5, 5, 6, 6], startingIndex: 3 },
      might: { index: 4, slider: [0, 2, 2, 3, 3, 4, 5, 6, 6], startingIndex: 4 },
      knowledge: { index: 3, slider: [0, 3, 3, 4, 5, 5, 6, 7, 8], startingIndex: 3 },
      sanity: { index: 5, slider: [0, 3, 3, 3, 4, 5, 6, 7, 8], startingIndex: 5 },
    },
  },

  {
    name: "Jaden Jones",
    color: "green",
    stats: {
      speed: { index: 3, slider: [0, 3, 4, 4, 4, 5, 6, 7, 8], startingIndex: 3 },
      might: { index: 4, slider: [0, 2, 3, 3, 3, 4, 5, 6, 7], startingIndex: 4 },
      knowledge: { index: 4, slider: [0, 3, 3, 4, 5, 5, 6, 6, 7], startingIndex: 4 },
      sanity: { index: 3, slider: [0, 3, 3, 4, 5, 5, 6, 7, 8], startingIndex: 3 },
    },
  },
  {
    name: "Oliver Swift",
    color: "red",
    stats: {
      speed: { index: 4, slider: [0, 3, 3, 4, 5, 5, 6, 7, 8], startingIndex: 4 },
      might: { index: 3, slider: [0, 3, 3, 4, 4, 5, 6, 6, 7], startingIndex: 3 },
      knowledge: { index: 4, slider: [0, 3, 3, 3, 4, 5, 6, 6, 7], startingIndex: 4 },
      sanity: { index: 3, slider: [0, 2, 3, 3, 4, 5, 5, 6, 7], startingIndex: 3 },
    },
  },
  {
    name: "Brittani 'Beat Box' Bowen",
    color: "purple",
    stats: {
      speed: { index: 3, slider: [0, 2, 3, 3, 4, 4, 5, 6, 6], startingIndex: 3 },
      might: { index: 4, slider: [0, 3, 3, 4, 5, 6, 7, 7, 8], startingIndex: 4 },
      knowledge: { index: 3, slider: [0, 3, 3, 4, 5, 5, 6, 6, 7], startingIndex: 3 },
      sanity: { index: 4, slider: [0, 3, 3, 4, 4, 5, 6, 6, 7], startingIndex: 4 },
    },
  },
  {
    name: "Anita Hernandez",
    color: "yellow",
    stats: {
      speed: { index: 3, slider: [0, 2, 3, 4, 4, 5, 6, 7, 8], startingIndex: 3 },
      might: { index: 4, slider: [0, 2, 2, 3, 4, 4, 5, 6, 7], startingIndex: 4 },
      knowledge: { index: 4, slider: [0, 4, 4, 5, 5, 6, 7, 8, 8], startingIndex: 4 },
      sanity: { index: 3, slider: [0, 2, 2, 3, 4, 5, 5, 6, 6], startingIndex: 3 },
    },
  },
  {
    name: "Persephone Puleri",
    color: "skyblue",
    stats: {
      speed: { index: 4, slider: [0, 3, 3, 4, 4, 5, 6, 7, 8], startingIndex: 4 },
      might: { index: 3, slider: [0, 3, 3, 4, 5, 6, 6, 7, 7], startingIndex: 3 },
      knowledge: { index: 3, slider: [0, 2, 3, 3, 4, 5, 6, 6, 7], startingIndex: 3 },
      sanity: { index: 4, slider: [0, 3, 3, 4, 5, 6, 7, 8, 8], startingIndex: 4 },
    },
  },
  {
    name: "Dan Nguyen, M.D.",
    color: "white",
    stats: {
      speed: { index: 3, slider: [0, 2, 3, 3, 4, 5, 6, 7, 7], startingIndex: 3 },
      might: { index: 3, slider: [0, 3, 3, 4, 4, 5, 5, 6, 7], startingIndex: 3 },
      knowledge: { index: 5, slider: [0, 3, 3, 4, 5, 5, 6, 7, 8], startingIndex: 5 },
      sanity: { index: 4, slider: [0, 2, 3, 4, 4, 5, 6, 7, 8], startingIndex: 4 },
    },
  },
];

export default playerInfo;
