import * as React from "react";
import { SearchField } from "../components/ui/SearchField";
import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { IProduct, UserRole } from "../components/network/APITypes";

export const SEARCH_DEBOUNCE_MS = 500;
export const imgageHost = "http://localhost:8080";

export class GeneralStore {
  isHydrated = false;
  isLoading = false;

  userId: string = "";
  loggedIn = false;
  userRoles: Array<UserRole> = ["customer"];
  userImage: null | string = null;

  products: Array<IProduct> = [];
  keyword = "";
  productsChangeFlag = false;

  currentProductLoaded = false;
  productChangeFlag = false;

  basketItems: null | number = null;
  basketChangeFlag = false;
  basketLoaded = false;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "GeneralStore",
      properties: ["loggedIn", "userId", "userRoles", "userImage"],
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
