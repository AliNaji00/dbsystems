import * as React from "react";
import {
  IOrder,
  getOrdersResponseMockData,
} from "../components/network/APITypes";
import { useGeneralStore } from "./GeneralStore";

export const useOrders = (user_id: string, seller_id?: string) => {
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadOrders = async () => {
      try {
        generalStore.isLoading = true;

        // const response = await API.getOrders(user_id, seller_id);
        const response = getOrdersResponseMockData;

        if (response && response.data) {
          setOrders(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id, seller_id]);

  return orders;
};
