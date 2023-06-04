import { observer } from "mobx-react";
import * as React from "react";
import { IShoppingCartItem } from "../../network/APITypes";
import { CenteredContent } from "../../ui/CenteredContent";
import { CustomerBackground } from "../../ui/Components";
import { ShoppingCart } from "../ShoppingCart";
import { Helmet } from "react-helmet";
import { title } from "../../app/router/RouteNames";
import { CustomerNavBar } from "../CustomerNavBar";
import { useBasket } from "../../../stores/useBasket";
import { useGeneralStore } from "../../../stores/GeneralStore";

export const CustomerShoppingCartSite = observer(() => {
  const generalStore = useGeneralStore();
  const basketItems = useBasket(generalStore.userId);

  return (
    <>
      <Helmet>
        <title>{title("Cart")}</title>
      </Helmet>
      <CustomerNavBar siteType="Other" />
      <CustomerBackground style={{ minHeight: 200 }}>
        <CenteredContent>
          <ShoppingCart items={basketItems} />
        </CenteredContent>
      </CustomerBackground>
    </>
  );
});
