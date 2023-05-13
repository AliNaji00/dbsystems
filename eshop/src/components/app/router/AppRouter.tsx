import { observer } from "mobx-react";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundSite } from "../sites/NotFoundSite";
import { RouteNames } from "./RouteNames";

export const AppRouter = observer(() => (
  <BrowserRouter>

    <Routes>
      <Route path={RouteNames.ROOT} element={<NotFoundSite />} />
      <Route element={<NotFoundSite />} />
    </Routes>
    
  </BrowserRouter>
));
