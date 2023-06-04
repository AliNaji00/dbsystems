import { Card, CardMedia } from "@mui/material";
import * as React from "react";
import { useGeneralStore } from "../../stores/GeneralStore";
import { IProduct } from "../network/APITypes";
import { CustomNumberField } from "../ui/ProductCartNumberField";
import { customColors } from "../util/Theme";
import { getImagePath } from "../util/Helpers";
import { API } from "../network/API";
import { Link } from "react-router-dom";
import { customerPrefix } from "./router/CustomerRouteNames";

export const ProductCard = (props: { product: IProduct }) => {
  const generalStore = useGeneralStore();

  return (
    <Card sx={{ width: 200, height: 355 }} elevation={6}>
      <Link to={customerPrefix(String(props.product.product_id))}>
        <CardMedia
          component="img"
          height="300"
          image={getImagePath(props.product.picture)}
          alt={props.product.name}
        />
      </Link>
      <div
        style={{
          backgroundColor: customColors.backgroundColor,
          height: 55,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <div style={{ flex: 1, width: "50%" }}>
          <div
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
            className="body1"
          >
            ${props.product.price}
          </div>
          <div
            className="body1"
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              color: customColors.primaryColorLight,
            }}
          >
            {props.product.name}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "end" }}>
          <CustomNumberField
            initialAmount={Number(props.product.AmountInBasket)}
            maxAmount={props.product.stock_quantity}
            changeValue={async (newNumber: number) => {
              try {
                generalStore.isLoading = true;

                await API.putBasket(
                  generalStore.userId,
                  props.product.product_id,
                  newNumber
                );
              } catch (err) {
                console.log(err);
              } finally {
                generalStore.isLoading = false;
                generalStore.productsChangeFlag =
                  !generalStore.productsChangeFlag;
              }
            }}
          />
        </div>
      </div>
    </Card>
  );
};
