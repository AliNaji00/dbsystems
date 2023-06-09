import { Avatar } from "@mui/material";
import { observer } from "mobx-react";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useProduct } from "../../../stores/useProduct";
import { title } from "../../app/router/RouteNames";
import { API } from "../../network/API";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { CustomNumberField } from "../../ui/ProductCartNumberField";
import { getImagePath } from "../../util/Helpers";
import { customColors } from "../../util/Theme";
import { CustomerNavBar } from "../CustomerNavBar";
import { useBasket } from "../../../stores/useBasket";

type ProductIdParam = {
  product_id: string;
};

export const CustomerProductSite = observer(() => {
  const { product_id } = useParams<ProductIdParam>();
  const generalStore = useGeneralStore();

  useBasket(generalStore.userId);

  const product = useProduct(generalStore.userId, product_id);

  return (
    <>
      <Helmet>
        <title>{title(product ? product.name : "")}</title>
      </Helmet>
      <CustomerNavBar siteType="Other" />
      <BackgroundContainer style={{ minHeight: 200 }}>
        {product && (
          <CenteredContent>
            <div
              style={{
                width: "100%",
                display: "flex",
                paddingBottom: 32,
                borderBottom: `1px solid ${customColors.primaryColor}`,
              }}
            >
              <div
                style={{
                  flex: 11, // This will take up 1/4 of the space
                  alignSelf: "flex-start",
                }}
              >
                <img
                  src={getImagePath(product.ImageURL)}
                  alt={product.name}
                  style={{
                    width: "100%", // Adjusts the width to fill the parent container
                    height: "auto",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 20,
                  padding: 20,
                  marginLeft: 48,
                }}
              >
                <h2>{product.name}</h2>
                <p style={{ fontSize: 16, marginBottom: 32 }}>
                  {product.description}
                </p>
                {!!product.original_price && (
                  <div style={{ display: "flex" }}>
                    <h4 style={{ flex: 1 }}>
                      <del>Price: $ {product.original_price}</del>
                    </h4>
                    <h4 style={{ color: customColors.green, flex: 4 }}>
                      {product.coupon_code}: {product.coupon_description}
                    </h4>
                  </div>
                )}
                <h4
                  style={{
                    marginTop: 8,
                  }}
                >
                  Price: $ {product.price}
                </h4>
                <div style={{ maxWidth: 100, alignSelf: "end" }}>
                  <CustomNumberField
                    initialAmount={product.AmountInBasket}
                    maxAmount={product.stock_quantity}
                    changeValue={async (newNumber: number) => {
                      try {
                        generalStore.isLoading = true;

                        await API.putBasket(
                          generalStore.userId,
                          product.product_id,
                          newNumber
                        );
                      } catch (err) {
                        console.log(err);
                      } finally {
                        generalStore.isLoading = false;
                        generalStore.toggleProductsChangeFlag();
                        generalStore.toggleProductChangeFlag();
                        generalStore.toggleBasketChangeFlag();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", padding: 16, gap: 16 }}>
              <Avatar
                src={getImagePath(product.SellerImageURL)}
                sx={{ bgcolor: customColors.primaryColor }}
              />
              <div style={{ maxWidth: 300, paddingTop: 3 }}>
                <h3>{product.store_name}</h3>
                <p style={{ fontSize: 16, margin: "8px 0" }}>
                  {product.store_email}
                </p>
                <p style={{ fontSize: 16, margin: "8px 0" }}>
                  {product.store_phone}
                </p>
                <p style={{ fontSize: 16, margin: "8px 0" }}>
                  {product.store_address}
                </p>
              </div>
            </div>
          </CenteredContent>
        )}
      </BackgroundContainer>
    </>
  );
});
