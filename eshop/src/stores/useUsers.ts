import * as React from "react";
import { useGeneralStore } from "./GeneralStore";
import {
  IUser,
  getUsersResponseMockData,
} from "../components/network/APITypes";

export const useUsers = () => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadOrders = async () => {
      try {
        generalStore.isLoading = true;

        // const response = await API.getUsers();
        const response = getUsersResponseMockData;

        if (response && response.data) {
          setUsers(response.data);
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
