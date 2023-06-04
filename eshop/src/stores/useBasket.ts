import * as React from "react";
import { API } from "../components/network/API";
import { useGeneralStore } from "./GeneralStore";
import { IShoppingCartItem } from "../components/network/APITypes";

export const useBasket = (user_id: string) => {
  const [basket, setBasket] = React.useState<IShoppingCartItem[]>([]);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        generalStore.isLoading = true;

        const response = await API.getBasket(user_id);

        if (response && response.data) {
          setBasket(response.data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalStore.basketChangeFlag]);

  return basket;
};
