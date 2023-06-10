import * as React from "react";
import { Helmet } from "react-helmet";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useOrders } from "../../../stores/useOrders";
import { title } from "../../app/router/RouteNames";
import { CollapsibleTable } from "../../customer/OrderTable";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";

export const SellerOrdersSite = () => {
  const generalStore = useGeneralStore();

  const orders = useOrders(generalStore.userId);

  return (
    <>
      <Helmet>
        <title>{title("Orders")}</title>
      </Helmet>
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          <CollapsibleTable orders={orders} type="seller" />
        </CenteredContent>
      </BackgroundContainer>
    </>
  );
};
