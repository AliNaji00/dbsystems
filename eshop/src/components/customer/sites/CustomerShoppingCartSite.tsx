import { observer } from "mobx-react";
import * as React from "react";
import {
  IShoppingCartItem,
  shoppingCartMockData,
} from "../../network/APITypes";
import { CenteredContent } from "../../ui/CenteredContent";
import { CustomerBackground } from "../../ui/Components";
import { ShoppingCart } from "../ShoppingCart";

export const CustomerShoppingCartSite = observer(() => {
  let [items, setItems] = React.useState<IShoppingCartItem[]>([]);

  React.useEffect(() => {
    setItems(shoppingCartMockData.data);
  }, []);

  return (
    <CustomerBackground style={{ minHeight: 200 }}>
      <CenteredContent>
        <ShoppingCart items={items} />
      </CenteredContent>
    </CustomerBackground>
  );
});
