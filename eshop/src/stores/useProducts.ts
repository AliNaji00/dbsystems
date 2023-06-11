import * as React from "react";
import { API } from "../components/network/API";
import { useGeneralStore } from "./GeneralStore";

export const useProducts = (
  keyword: string,
  user_id: string,
  seller_id?: string
) => {
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        generalStore.isLoading = true;

        const response = await API.getProducts(keyword, user_id, seller_id);

        if (response && response.data) {
          generalStore.setProducts(response.data.data);
          generalStore.toggleBasketChangeFlag();
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    keyword,
    generalStore.productsChangeFlag,
    user_id,
    seller_id,
    generalStore.userId,
  ]);
};
