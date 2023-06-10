import * as React from "react";
import { API } from "../components/network/API";
import { IUser } from "../components/network/APITypes";
import { useGeneralStore } from "./GeneralStore";

export const useUsers = () => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadOrders = async () => {
      try {
        generalStore.isLoading = true;

        const response = await API.getUsers();

        if (response && response.data) {
          setUsers(response.data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalStore.usersChangeFlag]);

  return users;
};
