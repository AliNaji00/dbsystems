export interface LoginResponse {
  msg: string;
  userrole: string;
}

export interface ILoginResponse {
  msg: string;
  code: number;
  data: LoginResponseData;
}

export interface LoginResponseData {
  user_id: string; // user id
  ImageURL: string; // link to image of profile picture
  userroles: Array<string>; // array of user roles (e.g. "admin", "customer")
  name: string; // name of user
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface GetProductsResponse {
  msg: string;
  code: number;
  data: Array<Product>;
}

export interface IProduct {
  Stock_quantity: number;
  Description: string;
  ID: number;
  ImageURL: string;
  AmountInBasket: number;
  Name: string;
  Price: number; // actual price, possibly reduced price
  Original_price: number;
}

export interface Product {
  Available: number;
  Category: string;
  Description: string;
  ID: number;
  ImageURL: string;
  Inventory: number;
  Name: string;
  Price: number;
  // reduced price
  Sales_volume: number;
}

export interface GetShoppingCartResponse {
  msg: string;
  data: Array<IShoppingCartItem>;
}

export interface IShoppingCartItem {
  product_id: number;
  quantity: number;
  image_url: string;
  name: string;
  price: number;
  original_price?: number;
  description: string;
}

export const shoppingCartMockData: GetShoppingCartResponse = {
  msg: "success",
  data: [
    {
      product_id: 1,
      quantity: 1,
      image_url: "./img/64d6662d.jpg",
      name: "Miaoli Tea",
      price: 100,
      original_price: 120,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae",
    },
    {
      product_id: 2,
      quantity: 2,
      image_url: "./img/94d72545.jpg",
      name: "Red Jade Tea",
      price: 200,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae nisl ultricies nunc, vitae",
    },
  ],
};
