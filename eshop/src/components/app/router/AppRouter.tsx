import { observer } from "mobx-react";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundSite } from "../sites/NotFoundSite";
import { RouteNames } from "./RouteNames";
import { LoginSite } from "../sites/LoginSite";

export const AppRouter = observer(() => (
  <BrowserRouter>
    <Routes>
      <Route path={RouteNames.LOG_IN} element={<LoginSite />} />
      <Route path="*" element={<NotFoundSite />} />
    </Routes>
  </BrowserRouter>
));
