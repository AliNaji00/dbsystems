import * as React from "react";
import { API } from "../components/network/API";
import { useGeneralStore } from "./GeneralStore";
import { IShoppingCartItem } from "../components/network/APITypes";
import _ from "lodash";

export const useBasket = (user_id: string) => {
  const [basket, setBasket] = React.useState<IShoppingCartItem[]>([]);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadBasket = async () => {
      try {
        generalStore.isLoading = true;

        const response = await API.getBasket(user_id);

        if (response && response.data && response.data.data) {
          setBasket(response.data.data);
          const sumOfProductsInBasket = _.sum(
            response.data.data.map((product) => {
              return Number(product.quantity);
            })
          );

          generalStore.setBasketItems(sumOfProductsInBasket);
          generalStore.setBasketLoaded(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    loadBasket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalStore.basketChangeFlag, user_id]);

  return basket;
};
