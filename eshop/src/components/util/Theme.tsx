import { createTheme } from "@mui/material/styles";

export const customColors = {
  primaryColor: "#42427D",
  primaryColorDark: "#2C2C53",
  primaryColorLight: "#8a8ac1",
  secondaryColor: "#F7FAFF",
  white: "#FFFFFF",
  body1: "#1D1E18",
};

export const theme = createTheme({
  palette: {
    background: {
      default: customColors.secondaryColor,
    },
    primary: {
      main: customColors.primaryColor,
      dark: customColors.primaryColorDark,
      light: customColors.primaryColorLight,
    },
    text: {
      primary: customColors.primaryColor,
    },
  },
});
