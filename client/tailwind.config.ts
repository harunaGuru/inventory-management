import type { Config } from "tailwindcss";
import {createThemes} from "tw-colors"
import colors from "tailwindcss/colors"

const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
  "sky", 
]

const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
}

const generateThemeObject = (colors: any, mapping: any, invert = false)=>{
  const themeObj:any = {};
  baseColors.forEach(color=>{
    themeObj[color] = {}
    Object.entries(mapping).forEach(([key, value]:any)=>{
      const mapKey = invert ? value : key;
      themeObj[color][key] = colors[color][mapKey];
    })
  })
  return themeObj
}

const lightThemes = generateThemeObject(colors, shadeMapping, false);
const darkThemes = generateThemeObject(colors, shadeMapping, true);

const theme = {
  light:{
    ...lightThemes,
    white: "#ffffff"
  },
  dark:{
    ...darkThemes,
    white: colors.gray["950"],
    black: colors.gray["50"],
  }
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    createThemes(theme)
  ],
};
export default config;
