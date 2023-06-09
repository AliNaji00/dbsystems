import dayjs from "dayjs";
import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import * as React from "react";
import {
  IPostCouponRequest,
  IProduct,
  UserRole,
} from "../components/network/APITypes";
import { SearchField } from "../components/ui/SearchField";

export const SEARCH_DEBOUNCE_MS = 500;
export const imgageHost = "http://localhost:8080";

export class GeneralStore {
  isHydrated = false;
  isLoading = false;

  userId: string = "";
  loggedIn = false;
  userRoles: Array<UserRole> = [];
  userImage: null | string = null;
  userName: null | string = null;
  userChangeFlag = false;
  userImageChangeCounter = 0;

  products: Array<IProduct> = [];
  keyword = "";
  productsChangeFlag = false;

  productChangeFlag = false;
  productImageChangeCounter = 0;

  basketItems: null | number = null;
  basketChangeFlag = false;
  basketLoaded = false;

  usersChangeFlag = false;
  ordersChangeFlag = false;

  createCouponDefaultValues: IPostCouponRequest = {
    description: "",
    coupon_type: "seasonal",
    start_time: dayjs(Date.now()),
    end_time: dayjs(Date.now()),
    seller_id: this.userId,
    product_ids: [],
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "GeneralStore",
      properties: ["loggedIn", "userId", "userRoles", "userImage", "userName"],
      storage: window.localStorage,
    }).then(
      action((persistStore) => {
        if (persistStore) {
          this.isHydrated = true;
        }
      })
    );
  }

  setProducts(products: Array<IProduct>) {
    this.products = products;
  }

  setBasketItems(items: number) {
    this.basketItems = items;
  }

  setBasketLoaded(loaded: boolean) {
    this.basketLoaded = loaded;
  }

  toggleProductsChangeFlag = () => {
    this.productsChangeFlag = !this.productsChangeFlag;
  };

  toggleProductChangeFlag = () => {
    this.productChangeFlag = !this.productChangeFlag;
  };

  toggleBasketChangeFlag = () => {
    this.basketChangeFlag = !this.basketChangeFlag;
  };

  toggleUserChangeFlag = () => {
    this.userChangeFlag = !this.userChangeFlag;
  };

  toggleUsersChangeFlag = () => {
    this.usersChangeFlag = !this.usersChangeFlag;
  };

  toggleOrdersChangeFlag = () => {
    this.ordersChangeFlag = !this.ordersChangeFlag;
  };

  handleSearchChange = (search: string) => {
    this.keyword = search;
  };

  logout = () => {
    this.loggedIn = false;
    this.userId = "";
    this.userRoles = [];
    this.userImage = null;
    this.userName = null;
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
