import { observer } from "mobx-react";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { CustomerBackground } from "../../ui/Components";
import { CustomerNavBar } from "../CustomerNavBar";
import { ProductCard } from "../ProductCard";

export const CustomerHomeSite = observer(() => {
  const generalStore = useGeneralStore();

  return (
    <>
      <Helmet>
        <title>{title("Home")}</title>
      </Helmet>
      <CustomerNavBar siteType="Search" />
      <CustomerBackground>
        <CenteredContent>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            {generalStore.products.map((product) => (
              <ProductCard product={product} key={product.product_id} />
            ))}
          </div>
        </CenteredContent>
      </CustomerBackground>
    </>
  );
});
