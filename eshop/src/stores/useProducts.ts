import * as React from "react";
import { API } from "../components/network/API";
import { IProduct } from "../components/network/APITypes";
import { useGeneralStore } from "./GeneralStore";

export const useProducts = (keyword: string) => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        generalStore.isLoading = true;

        const response = await API.getProducts(keyword);

        if (response && response.data) {
          setProducts(response.data.data);
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

  return products;
};
