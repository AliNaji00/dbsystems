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

export interface GetSingleProductResponse {
  msg: string;
  code: number;
  data: ISingleProduct;
}

export interface GetSingleProductRequest {
  product_id: string;
  user_id: string;
}

export interface ISingleProduct {
  stock_quantity: number;
  description: string;
  product_id: number;
  ImageURL: string;
  AmountInBasket: number; // amount in basket for given user_id
  name: string;
  price: number; // actual price, possibly reduced price
  original_price: number | undefined;
  seller_image_url: string | undefined;
  store_name: string;
  store_address: string;
  store_email: string;
  store_phone: string;
  coupon_code: string | undefined;
  coupon_description: string | undefined;
  coupon_percentage: number | undefined;
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

export const getSingleProductResponseMockData: GetSingleProductResponse = {
  msg: "Success",
  code: 200,
  data: {
    stock_quantity: 14,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus justo a erat vulputate mollis. Vivamus ultrices, sapien ac rhoncus porttitor, metus lorem accumsan magna, sit amet iaculis massa mauris id dolor. Ut mauris ipsum, tincidunt eu malesuada at, suscipit et neque. Morbi vitae sem neque. Integer sit amet ante iaculis, blandit tortor sed, gravida sapien. Integer aliquam felis a dui pharetra fringilla. Proin vulputate ligula ut tristique suscipit. Curabitur elementum tortor id risus tempor ultricies id ut lacus. Maecenas id risus suscipit, semper felis vitae, semper magna. Donec placerat velit nec diam congue aliquam. Sed a ullamcorper ante.",
    product_id: 1,
    ImageURL: "/api/img/placeholder.png",
    AmountInBasket: 3,
    name: "Product 1",
    price: 10,
    original_price: 20,
    seller_image_url: "/api/img/placeholder.png",
    store_name: "Store 1",
    store_address: "12 Street, City, Country",
    store_email: "email@example.com",
    store_phone: "+33 123 456 789",
    coupon_code: "CODE123",
    coupon_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. mauris id dolor. a ullamcorper ante.",
    coupon_percentage: 50,
  },
};
