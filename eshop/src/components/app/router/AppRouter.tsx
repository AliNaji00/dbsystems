import { observer } from "mobx-react";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundSite } from "../sites/NotFoundSite";
import { RouteNames } from "./RouteNames";
import { LoginSite } from "../sites/LoginSite";
import { CustomerRouter } from "../../customer/router/CustomerRouter";
import {
  ProtectedAdminRoute,
  ProtectedCustomerRoute,
  ProtectedRoute,
  ProtectedSellerRoute,
} from "../../util/ProtectedRoutes";
import { ProfileSite } from "../sites/ProfileSite";
import { SellerRouter } from "../../seller/router/SellerRouter";
import { RegisterSite } from "../sites/RegisterSite";
import { AdminSite } from "../../admin/sites/AdminSite";

export const AppRouter = observer(() => (
  <BrowserRouter>
    <Routes>
      <Route path={RouteNames.LOG_IN} element={<LoginSite />} />
      <Route path={RouteNames.REGISTER} element={<RegisterSite />} />
      <Route
        path={RouteNames.PROFILE}
        element={
          <ProtectedRoute>
            <ProfileSite />
          </ProtectedRoute>
        }
      />
      <Route
        path={RouteNames.CUSTOMER}
        element={
          <ProtectedCustomerRoute>
            <CustomerRouter />
          </ProtectedCustomerRoute>
        }
      />
      <Route
        path={RouteNames.SELLER}
        element={
          <ProtectedSellerRoute>
            <SellerRouter />
          </ProtectedSellerRoute>
        }
      />
      <Route
        path={RouteNames.ADMIN}
        element={
          <ProtectedAdminRoute>
            <AdminSite />
          </ProtectedAdminRoute>
        }
      />
      <Route path="*" element={<NotFoundSite />} />
    </Routes>
  </BrowserRouter>
));
