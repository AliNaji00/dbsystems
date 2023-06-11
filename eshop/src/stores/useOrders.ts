import * as React from "react";
import { API } from "../components/network/API";
import { ISellerOrder, IUserOrder } from "../components/network/APITypes";
import { useGeneralStore } from "./GeneralStore";

export const useOrders = (user_id?: string, seller_id?: string) => {
  const [userOrders, setUserOrders] = React.useState<IUserOrder[]>([]);
  const [sellerOrders, setSellerOrders] = React.useState<ISellerOrder[]>([]);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadOrders = async () => {
      try {
        generalStore.isLoading = true;

        if (user_id) {
          const response = await API.getUserOrders(user_id);

          if (response && response.data) {
            // sort orders by date and set them
            const sortedOrders = response.data.data.sort((a, b) => {
              return new Date(b.time).getTime() - new Date(a.time).getTime();
            });
            setUserOrders(sortedOrders);
          }
        } else if (seller_id) {
          const response = await API.getSellerOrders(seller_id);

          if (response && response.data) {
            // sort orders by date and set them
            const sortedOrders = response.data.data.sort((a, b) => {
              return new Date(b.time).getTime() - new Date(a.time).getTime();
            });
            setSellerOrders(sortedOrders);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id, seller_id, generalStore.ordersChangeFlag]);

  return { userOrders, sellerOrders };
};
