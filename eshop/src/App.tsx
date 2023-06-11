import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { observer } from "mobx-react";
import { AppContainerSite } from "./components/app/sites/AppContainerSite";
import { theme } from "./components/util/Theme";
import { useGeneralStore } from "./stores/GeneralStore";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App: React.FunctionComponent = observer(() => {
  const generalStore = useGeneralStore();

  const isRehydrated = generalStore.isHydrated;

  if (!isRehydrated) {
    return null;
  }
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContainerSite />
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
});

export default App;
