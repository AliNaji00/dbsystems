import { observer } from "mobx-react";
import * as React from "react";
import { AppRouter } from "../router/AppRouter";

export const AppContainerSite = observer(() => {
  return (
    <>
      <AppRouter />
    </>
  );
});
