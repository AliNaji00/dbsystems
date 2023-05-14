export interface LoginResponse {
    msg: string;
    userrole: string;
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface GetProductsResponse {
  msg: string;
  data: Array<IProduct>;
}

export interface IProduct {
  Available: number;
  Category: string;
  Description: string;
  ID: number;
  ImageURL: string;
  Inventory: number;
  Name: string;
  Price: number;
  Sales_volume: number;
}
