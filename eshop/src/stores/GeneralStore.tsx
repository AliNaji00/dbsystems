import * as React from "react";
import { SearchField } from "../components/ui/SearchField";
import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { UserRole } from "../components/network/APITypes";

export const SEARCH_DEBOUNCE_MS = 500;
export const imgageHost = "http://localhost/img";

export class GeneralStore {
  keyword = "";
  productsChangeFlag = false;
  isHydrated = false;

  isLoading = false;

  userId: string = "";
  loggedIn = false;
  userRoles: Array<UserRole> = ["customer"];

  basketItems: null | number = null;
  basketChangeFlag = false;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "GeneralStore",
      properties: ["loggedIn", "userId", "userRoles"],
      storage: window.localStorage,
    }).then(
      action((persistStore) => {
        if (persistStore) {
          this.isHydrated = true;
        }
      })
    );
  }

  handleSearchChange = (search: string) => {
    this.keyword = search;
  };

  logout = () => {
    this.loggedIn = false;
    this.userId = "";
    this.userRoles = ["customer"];
  };

  SearchField = (props: { placeholder: string; maxWidth?: boolean }) => {
    return (
      <SearchField
        searchValue={this.keyword}
        onChange={(search: string) => this.handleSearchChange(search)}
        placeholder={props.placeholder}
        style={{ flexGrow: 1, maxWidth: props.maxWidth ? 440 : "unset" }}
        debounceMs={SEARCH_DEBOUNCE_MS}
      />
    );
  };
}

let generalStore: GeneralStore | null = null;

export function useGeneralStore() {
  if (!generalStore) {
    generalStore = new GeneralStore();
  }

  return generalStore;
}

export function clearGeneralStore() {
  generalStore = null;
}
