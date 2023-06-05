import { observer } from "mobx-react";
import * as React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { NotFoundSite } from "../../app/sites/NotFoundSite";
import { SellerDashboardSite } from "../sites/SellerDashboardSite";
import { SellerRouteNames, sellerPrefix } from "./SellerRouteNames";
import { SellerProductsSite } from "../sites/SellerProductsSite";
import { SellerOrdersSite } from "../sites/SellerOrdersSite";
import { SellerCouponsSite } from "../sites/SellerCouponsSite";
import { SellerNavBar } from "../SellerNavBar";
import _ from "lodash";

export const SellerRouter = observer(() => {
  const location = useLocation();

  return (
    <>
      {
        // TODO the below handling of when the navbar is displayed is very hacky and not ideal
      }
      {_.values(SellerRouteNames)
        .map((route) => sellerPrefix(route))
        .includes(location.pathname) && <SellerNavBar />}
      <Routes>
        <Route
          path={SellerRouteNames.DASHBOARD}
          element={<SellerDashboardSite />}
        />

        <Route
          path={SellerRouteNames.PRODUCTS}
          element={<SellerProductsSite />}
        />

        <Route path={SellerRouteNames.ORDERS} element={<SellerOrdersSite />} />

        <Route
          path={SellerRouteNames.COUPONS}
          element={<SellerCouponsSite />}
        />
        <Route path="*" element={<NotFoundSite />} />
      </Routes>
    </>
  );
});
