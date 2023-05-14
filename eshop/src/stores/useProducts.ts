import * as React from "react";
import { API } from "../components/network/API";
import { IProduct } from "../components/network/APITypes";
import { useGeneralStore } from "./GeneralStore";
import { autorun, IReactionDisposer } from "mobx";

export const useProducts = (keyword: string) => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    let disposer: IReactionDisposer;
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

    disposer = autorun(() => {
      console.log(generalStore.keyword);
      loadProducts();
    });

    return () => {
      disposer();
    };
  }, []);

  return products;
};
