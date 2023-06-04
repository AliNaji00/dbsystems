import { Card, CardMedia } from "@mui/material";
import * as React from "react";
import { useGeneralStore } from "../../stores/GeneralStore";
import { API } from "../network/API";
import { IShoppingCartItem } from "../network/APITypes";
import { CustomNumberField } from "../ui/ProductCartNumberField";
import { getImagePath } from "../util/Helpers";
import { customColors } from "../util/Theme";

export const ShoppingCartItem = (props: { item: IShoppingCartItem }) => {
  const generalStore = useGeneralStore();

  return (
    <Card sx={{ display: "flex", height: 260 }}>
      <CardMedia
        component="img"
        sx={{
          flex: 1,
          minWidth: 0,
          height: "auto",
          objectFit: "contain",
        }}
        image={getImagePath(props.item.picture)}
        alt={props.item.name}
      />
      <div
        style={{
          flex: 2,
          backgroundColor: customColors.backgroundColor,
          borderRight: `2px solid ${customColors.body1}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4
          style={{
            margin: "16px 0 10px 16px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {props.item.name}
        </h4>
        <p style={{ margin: "0 16px" }}>{props.item.description}</p>
        <div style={{ flex: 1 }} />
        <h4 style={{ margin: "8px 16px" }}>Quantity:</h4>
        <div style={{ width: 100, marginBottom: 8 }}>
          <CustomNumberField
            initialAmount={Number(props.item.quantity)}
            maxAmount={props.item.stock_quantity}
            changeValue={async (newNumber: number) => {
              try {
                generalStore.isLoading = true;

                await API.putBasket(
                  generalStore.userId,
                  props.item.product_id,
                  newNumber
                );
              } catch (err) {
                console.log(err);
              } finally {
                generalStore.isLoading = false;
                generalStore.basketChangeFlag = !generalStore.basketChangeFlag;
              }
            }}
          />
        </div>
      </div>
      <div
        style={{
          flex: 1,
          backgroundColor: customColors.backgroundColor,
        }}
      >
        {!!props.item.original_price && (
          <h4 style={{ marginLeft: 16, marginTop: 16 }}>
            <del>Price: $ {props.item.original_price}</del>
          </h4>
        )}
        <h4
          style={{
            marginLeft: 16,
            marginTop: !!props.item.original_price ? 24 : 16,
          }}
        >
          Price: $ {props.item.price}
        </h4>
      </div>
    </Card>
  );
};
