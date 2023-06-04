import _ from "lodash";
import * as React from "react";
import { API } from "../components/network/API";
import { useGeneralStore } from "./GeneralStore";

export const useProducts = (keyword: string, user_id: string) => {
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        generalStore.isLoading = true;

        const response = await API.getProducts(keyword, user_id);

        if (response && response.data) {
          generalStore.products = response.data.data;
          const sumOfProductsInBasket = _.sum(
            response.data.data.map((product) => {
              return Number(product.AmountInBasket);
            })
          );

          generalStore.basketItems = sumOfProductsInBasket;
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, generalStore.productsChangeFlag]);
};
