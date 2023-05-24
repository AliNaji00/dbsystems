import { observer } from "mobx-react";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFoundSite } from "../../app/sites/NotFoundSite";
import { CustomerHomeSite } from "../sites/CustomerHomeSite";
import { CustomerShoppingCartSite } from "../sites/CustomerShoppingCartSite";
import { CustomerRouteNames } from "./CustomerRouteNames";

export const CustomerRouter = observer(() => (
  <>
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
