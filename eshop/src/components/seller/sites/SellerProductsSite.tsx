import * as React from "react";
import { Helmet } from "react-helmet";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";

export const SellerProductsSite = () => {
  return (
    <>
      <Helmet>
        <title>{title("Products")}</title>
      </Helmet>
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent></CenteredContent>
      </BackgroundContainer>
    </>
  );
};
