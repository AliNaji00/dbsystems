import * as React from "react";
import { Helmet } from "react-helmet";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { ProductCard } from "../../customer/ProductCard";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useProducts } from "../../../stores/useProducts";
import { observer } from "mobx-react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { SellerRouteNames, sellerPrefix } from "../router/SellerRouteNames";

export const SellerProductsSite = observer(() => {
  const generalStore = useGeneralStore();

  useProducts("", "", generalStore.userId);

  return (
    <>
      <Helmet>
        <title>{title("Products")}</title>
      </Helmet>
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          <div style={{ display: "flex", width: "100%" }}>
            <Link to={sellerPrefix(SellerRouteNames.CREATE_PROCUCT)}>
              <AddCircleOutlineIcon
                color="primary"
                sx={{ width: 48, height: 48, marginBottom: 2 }}
              />
            </Link>
          </div>
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
