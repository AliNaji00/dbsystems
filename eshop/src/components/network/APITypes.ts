export interface LoginResponse {
  msg: string;
  userrole: string;
}

export interface ILoginResponse {
  msg: string;
  ImageURL: string;
  userroles: Array<string>;
  name: string;
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
