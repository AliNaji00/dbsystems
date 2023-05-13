import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { observer } from "mobx-react";
import { AppContainerSite } from "./components/app/sites/AppContainerSite";
import { theme } from "./components/util/Theme";

const App: React.FunctionComponent = observer(() => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
            <AppContainerSite />
      </ThemeProvider>
    </>
  );
});

export default App;
