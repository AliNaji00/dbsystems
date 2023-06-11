import _ from "lodash";
import * as React from "react";
import { API } from "../components/network/API";
import { ICheckOrderResponse } from "../components/network/APITypes";
import { useGeneralStore } from "./GeneralStore";

export const useCheckOrder = (user_id: string, coupon_codes: string[]) => {
  const [checkOrder, setCheckOrder] =
    React.useState<ICheckOrderResponse | null>(null);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const checkOrder = async () => {
      try {
        generalStore.isLoading = true;

        const response = await API.checkOrder(user_id, coupon_codes);

        if (response && response.data) {
          setCheckOrder(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    checkOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalStore.basketChangeFlag, user_id, coupon_codes]);

  return checkOrder;
};
