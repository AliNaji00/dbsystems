import { observer } from "mobx-react";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundSite } from "../sites/NotFoundSite";
import { RouteNames } from "./RouteNames";
import { LoginSite } from "../sites/LoginSite";
import { CustomerRouter } from "../../customer/router/CustomerRouter";
import { ProtectedRoute } from "../../util/ProtectedRoute";
import { ProfileSite } from "../sites/ProfileSite";

export const AppRouter = observer(() => (
  <BrowserRouter>
    <Routes>
      <Route path={RouteNames.LOG_IN} element={<LoginSite />} />
      <Route path={RouteNames.PROFILE} element={<ProfileSite />} />
      <Route
        path={RouteNames.CUSTOMER}
        element={
          <ProtectedRoute>
            <CustomerRouter />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundSite />} />
    </Routes>
  </BrowserRouter>
));
