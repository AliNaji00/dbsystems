import { observer } from "mobx-react";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useBasket } from "../../../stores/useBasket";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { CustomerBackground } from "../../ui/Components";
import { CustomerNavBar } from "../CustomerNavBar";
import { ShoppingCart } from "../ShoppingCart";

export const CustomerShoppingCartSite = observer(() => {
  const generalStore = useGeneralStore();
  const basketItems = useBasket(generalStore.userId);

  React.useEffect(() => {
    return () => {
      generalStore.setBasketLoaded(false);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{title("Cart")}</title>
      </Helmet>
      <CustomerNavBar siteType="Other" />
      <CustomerBackground style={{ minHeight: 200 }}>
        <CenteredContent>
          {generalStore.basketLoaded && <ShoppingCart items={basketItems} />}
        </CenteredContent>
      </CustomerBackground>
    </>
  );
});
