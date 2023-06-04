import * as React from "react";
import { Helmet } from "react-helmet";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { CustomerBackground } from "../../ui/Components";
import { CustomerNavBar } from "../CustomerNavBar";
import { useParams } from "react-router-dom";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useProduct } from "../../../stores/useProduct";
import { getSingleProductResponseMockData } from "../../network/APITypes";

type ProductIdParam = {
  productId: string;
};

export const CustomerProductSite = () => {
  const { productId } = useParams<ProductIdParam>();
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    return () => {
      generalStore.currentProductLoaded = false;
    };
  }, []);

  // const product = useProduct(generalStore.userId, productId);
  const product = getSingleProductResponseMockData.data;

  return (
    <>
      <Helmet>
        <title>{title(product.name)}</title>
      </Helmet>
      <CustomerNavBar siteType="Other" />
      <CustomerBackground style={{ minHeight: 200 }}>
        <CenteredContent>
          <div
            style={{ backgroundColor: "black", height: 200, width: 500 }}
          ></div>
        </CenteredContent>
      </CustomerBackground>
    </>
  );
};
