import { type ITheme } from "../types";

const OceanBreeze: ITheme = {
  name: "Ocean Breeze",
  colors: {
    a: "#09b0e8",
    b: "#7f9fbd",
    c: "#95a7b8",
    d: "#b4d2d8",
  },
  text: "white",
  oT: "black",
  background: "rgb(20,25,30)",
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
  background: "gray",
};

const TropicalJungle: ITheme = {
  name: "Tropical Jungle",
  colors: {
    c: "#00c64f",
    a: "#00b34c",
    b: "#007f5f",
    d: "#cce6cc",
  },
  text: "black",
  oT: "white",
  background: "gray",
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

const Cabin: ITheme = {
  name: "Cabin in the Woods",
  colors: {
    a: "#00bf33",
    b: "#a28573",
    c: "#765948",
    d: "#765948",
  },
  text: "white",
  oT: "black",
  background: "slategrey",
};

const Blackhole: ITheme = {
  name: "Blackhole",
  colors: {
    a: "#ec6767",
    b: "rgb(35, 35, 45)",
    c: "rgb(15, 15, 25)",
    d: "rgb(5, 5, 15)",
  },
  text: "white",
  oT: "black",
  background: "black",
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
  Blackhole,
  PastelRainbow,
  MidnightCity,
  OceanBreeze,
  Cabin,
  Sadagonia,
  CherryBlossom,
  TropicalJungle,
  Retro,
];

export default Themes;
