import { observer } from "mobx-react";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFoundSite } from "../../app/sites/NotFoundSite";
import { CustomerNavBar } from "../CustomerNavBar";
import { CustomerHomeSite } from "../sites/CustomerHomeSite";
import { CustomerRouteNames } from "./CustomerRouteNames";
import { CustomerShoppingCartSite } from "../sites/CustomerShoppingCartSite";

export const CustomerRouter = observer(() => (
  <>
    <CustomerNavBar />
    <Routes>
      <Route path={CustomerRouteNames.HOME} element={<CustomerHomeSite />} />
      <Route
        path={CustomerRouteNames.SHOPPING_CART}
        element={<CustomerShoppingCartSite />}
      />
      <Route path="*" element={<NotFoundSite />} />
    </Routes>
  </>
));
