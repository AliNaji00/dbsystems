import { Card, CardMedia } from "@mui/material";
import * as React from "react";
import { Product } from "../network/APITypes";
import { getImagePath } from "../util/Helpers";
import { customColors } from "../util/Theme";
import { CustomNumberField } from "../ui/ProductCartNumberField";
import { useGeneralStore } from "../../stores/GeneralStore";

export const ProductCard = (props: { product: Product }) => {
  const generalStore = useGeneralStore();

  return (
    <Card sx={{ width: 200, height: 355 }} elevation={6}>
      <CardMedia
        component="img"
        height="300"
        image={getImagePath(props.product.ImageURL)}
        alt={props.product.Name}
      />
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
            ${props.product.Price}
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
            {props.product.Name}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "end" }}>
          <CustomNumberField
            initialAmount={0}
            maxAmount={10}
            changeValue={(newNumber: number) => {
              generalStore.productsChangeFlag =
                !generalStore.productsChangeFlag;
            }}
          />
        </div>
      </div>
    </Card>
  );
};
