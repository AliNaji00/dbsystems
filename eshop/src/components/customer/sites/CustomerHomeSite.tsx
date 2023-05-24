import { observer } from "mobx-react";
import * as React from "react";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useProducts } from "../../../stores/useProducts";
import { CenteredContent } from "../../ui/CenteredContent";
import { CustomerBackground } from "../../ui/Components";
import { ProductCard } from "../ProductCard";
import { CustomerNavBar } from "../CustomerNavBar";
import { Helmet } from "react-helmet";
import { title } from "../../app/router/RouteNames";

export const CustomerHomeSite = observer(() => {
  const generalStore = useGeneralStore();
  const products = useProducts(generalStore.keyword);

  return (
    <>
      <Helmet>
        <title>{title("Home")}</title>
      </Helmet>
      <CustomerNavBar siteType="Home" />
      <CustomerBackground>
        <CenteredContent>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
            }}
            onClick={() => console.log(generalStore.keyword)}
          >
            {products.map((product) => (
              <ProductCard product={product} key={product.ID} />
            ))}
          </div>
        </CenteredContent>
      </CustomerBackground>
    </>
  );
});
