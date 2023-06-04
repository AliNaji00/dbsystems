import * as React from "react";
import { IShoppingCartItem } from "../network/APITypes";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { customColors } from "../util/Theme";
import { Button, Card, TextField } from "@mui/material";
import { API } from "../network/API";

export const ShoppingCart = (props: { items: IShoppingCartItem[] }) => {
  React.useEffect(() => {
    API.getBasket("3").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          paddingRight: 16,
        }}
      >
        {props.items.map((item) => (
          <ShoppingCartItem item={item} />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginLeft: "32px",
          gap: 32,
        }}
      >
        <Card
          sx={{
            backgroundColor: customColors.backgroundColor,
            height: "fit-content",
            width: "100%",
          }}
        >
          <div
            style={{
              borderBottom: `2px solid ${customColors.body1}`,
              padding: "32px 32px 8px",
            }}
          >
            {props.items.map((item) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <h4>
                  {item.quantity}x {item.name}
                </h4>
                <h4>$ {item.quantity * item.price}</h4>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              padding: "32px 32px 16px",
            }}
          >
            <h4>TOTAL:</h4>
            <h4>
              ${" "}
              {props.items.reduce(
                (total, item) => total + item.quantity * item.price,
                0
              )}
            </h4>
          </div>
        </Card>
        <div>
          <h4>Enter coupon codes:</h4>
          <TextField
            label="Coupon"
            variant="outlined"
            fullWidth
            color="primary"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <Button type="submit" variant="contained" color="primary">
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};
