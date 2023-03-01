import { type ITheme } from "../types";

const Dark: ITheme = {
  name: "Dark",
  colors: {
    a: "#8c8a9d",
    b: "#59546c",
    c: "#38405f",
    d: "#0e131f",
  },
  text: "white",
  oT: "black",
  background: "#0e131f",
};

const Light: ITheme = {
  name: "Light",
  colors: {
    a: "#8c8a9d",
    b: "#999999",
    c: "#c4c4c4",
    d: "#e6e6e6",
  },
  text: "black",
  oT: "white",
  background: "#e6e6e6",
};


const JoJo: ITheme = {
  name: 'Platinum JoJo',
  colors: {
    a: '#d8e2dc',
    b: '#ffe5d9',
    c: '#ffcad4',
    d: '#f4acb7',
    },
  text: 'black',
  oT: 'white',
  background: '#9d8189' 
}

const OceanBreeze: ITheme = {
  name: "Ocean Breeze",
  colors: {
    a: "#90e0ef",
    b: "#08afb5",
    c: "#00b4d8",
    d: "#0077b6",
  },
  text: "black",
  oT: "white",
  background: "#0077b6",
};

const PastelRainbow: ITheme = {
  name: "Pastel Rainbow",
  colors: {
    a: "#ff8b94",
    b: "#ffaaa5",
    c: "#ffd3b6",
    d: "#dcedc1",
  },
  text: "black",
  oT: "white",
  background: "#dcedc1",
};

const TropicalJungle: ITheme = {
  name: "Tropical Jungle",
  colors: {
    a: "#007f5f",
    b: "#00b34c",
    c: "#00c64f",
    d: "#cce6cc",
  },
  text: "black",
  oT: "white",
  background: "#cce6cc",
};

const MidnightCity: ITheme = {
  name: "Midnight City",
  colors: {
    a: "#ac6dc3",
    b: "#b654d9",
    c: "#4d1b5b",
    d: "#220a2d",
  },
  text: "white",
  oT: "black",
  background: "#220a2d",
};

const Sadagonia: ITheme = {
  name: "Sadagonia",
  colors: {
    a: "#e96c13",
    b: "#973529",
    c: "#d0b280",
    d: "#2a334f",
  },
  text: "white",
  oT: "black",
  background: "#2a334f",
};

const CherryBlossom: ITheme = {
  name: "Cherry Blossom",
  colors: {
    a: "#fc79c5",
    b: "#ffb5df",
    c: "#b5e0ff",
    d: "#efe6f6",
  },
  text: "black",
  oT: "white",
  background: "#efe6f6",
};

const Treehouse: ITheme = {
  name: "Treehouse",
  colors: {
    a: "#00bf33",
    b: "#a28573",
    c: "#765948",
    d: "#f2e9e1",
  },
  text: "black",
  oT: "white",
  background: "#f2e9e1",
};

const Retro: ITheme = {
  name: "Retro",
  colors: {
    b: "#6fcb9f",
    a: "#fb2e01",
    c: "#ffe28a",
    d: "#fffeb3",
  },
  text: "white",
  oT: "black",
  background: "darkslateblue",
}

const Themes = [
  Light,
  Dark,
  JoJo,
  OceanBreeze,
  PastelRainbow,
  MidnightCity,
  Treehouse,
  Sadagonia,
  CherryBlossom,
  TropicalJungle,
  Retro,
];

export default Themes;
