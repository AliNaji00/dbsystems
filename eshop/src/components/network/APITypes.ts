export type UserRole = "admin" | "customer" | "seller";

export interface ILoginResponse {
  msg: string;
  data: LoginResponseData;
}

export interface LoginResponseData {
  user_id: string; // user id
  ImageURL: string; // link to image of profile picture
  userroles: Array<UserRole>; // array of user roles (e.g. "admin", "customer")
  name: string; // name of user
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface GetProductsResponse {
  msg: string;
  code: number;
  data: Array<IProduct>;
}

export interface GetProductsRequest {
  keyword?: string;
  user_id: string;
}

export interface IProduct {
  stock_quantity: number;
  description: string;
  product_id: number;
  picture: string | null;
  AmountInBasket: number;
  name: string;
  price: number; // actual price, possibly reduced price
  original_price?: number;
}

export interface GetBasketResponse {
  msg: string;
  data: Array<IShoppingCartItem>;
}

export interface IShoppingCartItem {
  product_id: number;
  stock_quantity: number;
  picture: string | null;
  name: string;
  price: number;
  original_price?: number;
  description: string;
  quantity: number;
}

export interface PutShoppingCartResponse {
  msg: string;
}
