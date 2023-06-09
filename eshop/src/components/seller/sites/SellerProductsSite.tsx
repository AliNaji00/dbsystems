import * as React from "react";
import { Helmet } from "react-helmet";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { ProductCard } from "../../customer/ProductCard";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useProducts } from "../../../stores/useProducts";
import { observer } from "mobx-react";

export const SellerProductsSite = observer(() => {
  const generalStore = useGeneralStore();

  // TODO: adapt below custom hook to get seller products
  useProducts("", generalStore.userId);

  return (
    <>
      <Helmet>
        <title>{title("Products")}</title>
      </Helmet>
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            {generalStore.products.map((product) => (
              <ProductCard
                product={product}
                key={product.product_id}
                type="seller"
              />
            ))}
          </div>
        </CenteredContent>
      </BackgroundContainer>
    </>
  );
});
