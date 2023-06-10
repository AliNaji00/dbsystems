import { observer } from "mobx-react";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useBasket } from "../../../stores/useBasket";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { CustomerNavBar } from "../CustomerNavBar";
import { ShoppingCart } from "../ShoppingCart";
import { API } from "../../network/API";

export const CustomerShoppingCartSite = observer(() => {
  const generalStore = useGeneralStore();
  const basketItems = useBasket(generalStore.userId);

  React.useEffect(() => {
    return () => {
      generalStore.setBasketLoaded(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    try {
      API.checkOrder(generalStore.userId, []);
    } finally {
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{title("Cart")}</title>
      </Helmet>
      <CustomerNavBar siteType="Other" title="Shopping Cart" />
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          {generalStore.basketLoaded && <ShoppingCart items={basketItems} />}
        </CenteredContent>
      </BackgroundContainer>
    </>
  );
});
