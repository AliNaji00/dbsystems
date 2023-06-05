import { observer } from "mobx-react";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFoundSite } from "../../app/sites/NotFoundSite";
import { SellerDashboardSite } from "../sites/SellerDashboardSite";
import { SellerRouteNames } from "./SellerRouteNames";

export const SellerRouter = observer(() => {
  return (
    <>
      <Routes>
        <Route
          path={SellerRouteNames.DASHBOARD}
          element={<SellerDashboardSite />}
        />
        <Route path="*" element={<NotFoundSite />} />
      </Routes>
    </>
  );
});
