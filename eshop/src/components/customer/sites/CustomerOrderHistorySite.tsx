import * as React from "react";
import { Helmet } from "react-helmet";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useOrders } from "../../../stores/useOrders";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { CustomerNavBar } from "../CustomerNavBar";
import { CollapsibleTable } from "../OrderTable";

export const CustomerOrderHistorySite = () => {
  const generalStore = useGeneralStore();

  const { userOrders } = useOrders(generalStore.userId);

  return (
    <>
      <Helmet>
        <title>{title("Order History")}</title>
      </Helmet>
      <CustomerNavBar siteType="Other" title="Order History" />
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          <CollapsibleTable userOrders={userOrders} />
        </CenteredContent>
      </BackgroundContainer>
    </>
  );
};
