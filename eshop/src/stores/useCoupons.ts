import * as React from "react";
import {
  ICoupon,
  getCouponsResponseMockData,
} from "../components/network/APITypes";
import { useGeneralStore } from "./GeneralStore";

export const useCoupons = (seller_id: string) => {
  const [coupons, setCoupons] = React.useState<ICoupon[]>([]);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadCoupons = async () => {
      try {
        generalStore.isLoading = true;

        // const response = await API.getCoupons(seller_id);
        const response = getCouponsResponseMockData;

        if (response && response.data) {
          setCoupons(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    loadCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return coupons;
};
