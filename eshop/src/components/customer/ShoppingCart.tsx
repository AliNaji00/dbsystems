import { Button } from "@mui/material";
import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { IShoppingCartItem } from "../network/APITypes";
import { undraw_empty_cart_co35 } from "../util/Images";
import { ShoppingCartItem } from "./ShoppingCartItem";
import {
  CustomerRouteNames,
  customerPrefix,
} from "./router/CustomerRouteNames";
import { ShoppingCartCalculation } from "./ShoppingCartCalculation";

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
              flex: 4,
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
          <ShoppingCartCalculation items={props.items} />
        </div>
      );
    }
  }
);
