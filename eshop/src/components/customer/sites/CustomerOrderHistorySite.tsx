import * as React from "react";
import { Helmet } from "react-helmet";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { CustomerBackground } from "../../ui/Components";
import { CustomerNavBar } from "../CustomerNavBar";
import { CollapsibleTable } from "../OrderTable";

export const CustomerOrderHistorySite = () => {
  return (
    <>
      <Helmet>
        <title>{title("Order History")}</title>
      </Helmet>
      <CustomerNavBar siteType="Other" title="Order History" />
      <CustomerBackground style={{ minHeight: 200 }}>
        <CenteredContent>
          <CollapsibleTable />
        </CenteredContent>
      </CustomerBackground>
    </>
  );
};
