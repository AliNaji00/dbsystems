import * as React from "react";
import { API } from "../components/network/API";
import { IUser } from "../components/network/APITypes";
import { useGeneralStore } from "./GeneralStore";

export const useUser = (user_id: string) => {
  const [user, setUser] = React.useState<IUser | undefined>(undefined);
  const generalStore = useGeneralStore();

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        generalStore.isLoading = true;

        if (user_id) {
          const response = await API.getUser(user_id);

          if (response && response.data) {
            setUser(response.data.data);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        generalStore.isLoading = false;
      }
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id, generalStore.userChangeFlag]);

  return user;
};
