import { Button, Card, TextField } from "@mui/material";
import * as React from "react";
import { IShoppingCartItem } from "../network/APITypes";
import { customColors } from "../util/Theme";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { undraw_empty_cart_co35 } from "../util/Images";
import { Link } from "react-router-dom";
import {
  CustomerRouteNames,
  customerPrefix,
} from "./router/CustomerRouteNames";
import { observer } from "mobx-react";

export const ShoppingCart = observer(
  (props: { items: IShoppingCartItem[] }) => {
    if (props.items.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 64,
          }}
        >
          <h1 style={{ textAlign: "center" }}>Such empty...</h1>
          <h3 style={{ textAlign: "center", marginBottom: 50 }}>
            Please add some items to your shopping basket first!
          </h3>
          <img
            src={undraw_empty_cart_co35}
            alt="Page not found"
            style={{ maxWidth: 350, marginBottom: 100 }}
          />
          <Link to={customerPrefix(CustomerRouteNames.HOME)}>
            <Button variant="contained">Go shopping!</Button>
          </Link>
        </div>
      );
    } else {
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
              <ShoppingCartItem item={item} key={item.product_id} />
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
                    key={item.product_id}
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
            <div
              style={{ display: "flex", justifyContent: "end", width: "100%" }}
            >
              <Button type="submit" variant="contained" color="primary">
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }
);
