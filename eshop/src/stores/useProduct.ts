import * as React from "react";
import { API } from "../components/network/API";
import { ISingleProduct } from "../components/network/APITypes";
import { useGeneralStore } from "./GeneralStore";

export const useProduct = (user_id: string, product_id?: string) => {
  const [product, setProduct] = React.useState<ISingleProduct | undefined>(
    undefined
  );
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadProduct = async () => {
      try {
        generalStore.isLoading = true;

        if (product_id) {
          const response = await API.getProduct(product_id, user_id);

          if (response && response.data) {
            setProduct(response.data);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id, user_id, generalStore.productChangeFlag]);

  return product;
};
