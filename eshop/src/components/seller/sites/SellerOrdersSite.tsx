import * as React from "react";
import { Helmet } from "react-helmet";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useOrders } from "../../../stores/useOrders";
import { title } from "../../app/router/RouteNames";
import { CollapsibleTable } from "../../customer/OrderTable";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { observer } from "mobx-react";

export const SellerOrdersSite = observer(() => {
  const generalStore = useGeneralStore();

  const { sellerOrders } = useOrders(undefined, generalStore.userId);

  return (
    <>
      <Helmet>
        <title>{title("Orders")}</title>
      </Helmet>
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          <CollapsibleTable sellerOrders={sellerOrders} />
        </CenteredContent>
      </BackgroundContainer>
    </>
  );
});
