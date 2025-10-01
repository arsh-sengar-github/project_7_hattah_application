import { Nunito } from "next/font/google";
import { createTheme } from "@mui/material";

const nunitoFont = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const lightMode = createTheme({
  colorSchemes: {
    light: true,
  },
  palette: {
    mode: "light",
    common: {
      black: "#030712",
      white: "#ffffff",
    },
    primary: {
      main: "#f97316",
    },
    secondary: {
      main: "#facc15",
      light: "#fef9c3",
    },
    background: {
      paper: "#ffffff",
      default: "#ffffff",
    },
    text: {
      primary: "#030712",
      secondary: "#6b7280",
    },
    success: {
      main: "#22c55e",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: nunitoFont.style.fontFamily,
  },
  shadows: {
    0: "none",
    1: "0px 2px 1px -1px rgba(0,0,0,0.15),0px 1px 1px 0px rgba(0,0,0,0.15),0px 1px 3px 0px rgba(0,0,0,0.15)",
    2: "none",
    8: "0 5px 5px rgba(0, 0,0,0.15)",
  },
});

export const darkMode = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    mode: "dark",
    common: {
      black: "#030712",
      white: "#ffffff",
    },
    primary: {
      main: "#f97316",
    },
    secondary: {
      main: "#facc15",
    },
    background: {
      paper: "#0b0a10",
      default: "#0b0a10",
    },
    text: {
      primary: "#d4d4d4",
      secondary: "#9ca3af",
    },
    action: {
      active: "#facc15",
    },
  },
  typography: {
    fontFamily: nunitoFont.style.fontFamily,
  },
  shadows: {
    0: "none",
    1: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    2: "none",
    8: "0 5px 5px rgba(0, 0,0,0.15)",
  },
});
