import * as React from "react";
import { API } from "../components/network/API";
import { ISalesStatistics } from "../components/network/APITypes";
import { useGeneralStore } from "./GeneralStore";

export const useSalesStatistics = (seller_id: string) => {
  const [salesStatistics, setSalesStatistics] = React.useState<
    ISalesStatistics | undefined
  >(undefined);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadSalesStatistics = async () => {
      try {
        generalStore.isLoading = true;

        const response = await API.getSalesStatistics(seller_id);

        if (response && response.data) {
          setSalesStatistics(response.data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    loadSalesStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seller_id]);

  return salesStatistics;
};
