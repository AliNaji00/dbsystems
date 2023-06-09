import * as React from "react";
import { Helmet } from "react-helmet";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { SellerNavBar } from "../SellerNavBar";
import { useParams } from "react-router-dom";

type ProductIdParam = {
  productId: string;
};

export const SellerSingleProductSite = () => {
  const { productId } = useParams<ProductIdParam>();
  return (
    <>
      <Helmet>
        <title>{title("Orders")}</title>
      </Helmet>
      <SellerNavBar />
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent></CenteredContent>
      </BackgroundContainer>
    </>
  );
};
