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
import { SellerSingleProductSite } from "../sites/SellerSingleProductSite";
import { SellerCreateProductSite } from "../sites/SellerCreateProductSite";
import { SellerCreateCouponSite } from "../sites/SellerCreateCouponSite";

export const SellerRouter = observer(() => {
  const location = useLocation();

  return (
    <>
      {
        // NOTE the below handling of when the navbar is displayed is very hacky and not ideal
      }
      {_.values(SellerRouteNames)
        .map((route) => sellerPrefix(route))
        .slice(0, 4)
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

        <Route
          path={SellerRouteNames.PRODUCT}
          element={<SellerSingleProductSite />}
        />

        <Route
          path={SellerRouteNames.CREATE_PROCUCT}
          element={<SellerCreateProductSite />}
        />

        <Route
          path={SellerRouteNames.CREATE_COUPON}
          element={<SellerCreateCouponSite />}
        />

        <Route path="*" element={<NotFoundSite />} />
      </Routes>
    </>
  );
});
