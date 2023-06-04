import { observer } from "mobx-react";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFoundSite } from "../../app/sites/NotFoundSite";
import { CustomerHomeSite } from "../sites/CustomerHomeSite";
import { CustomerShoppingCartSite } from "../sites/CustomerShoppingCartSite";
import { CustomerRouteNames } from "./CustomerRouteNames";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useProducts } from "../../../stores/useProducts";
import { CustomerProductSite } from "../sites/CustomerProductSite";

export const CustomerRouter = observer(() => {
  const generalStore = useGeneralStore();
  generalStore.products = useProducts(
    generalStore.keyword,
    generalStore.userId
  );

  return (
    <>
      <Routes>
        <Route path={CustomerRouteNames.HOME} element={<CustomerHomeSite />} />
        <Route
          path={CustomerRouteNames.SHOPPING_CART}
          element={<CustomerShoppingCartSite />}
        />
        <Route
          path={CustomerRouteNames.PRODUCT}
          element={<CustomerProductSite />}
        />
        <Route path="*" element={<NotFoundSite />} />
      </Routes>
    </>
  );
});
