let tokens = [
  {
    type: "blessing",
    effect: () => {
      console.log("blessing");
    },
  },
  {
    type: "obstacle",
    effect: () => {
      console.log("obstacle");
    },
  },
  {
    type: "secret passage",
    effect: () => {
      console.log("secret passage");
    },
  },
];

export default tokens;
