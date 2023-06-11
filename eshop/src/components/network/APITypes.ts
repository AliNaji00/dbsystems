import dayjs from "dayjs";

export type UserRole = "admin" | "customer" | "seller";

export interface ILoginResponse {
  msg: string;
  data: ILoginResponseData;
}

export interface ILoginResponseData {
  user_id: string; // user id
  ImageURL: string; // link to image of profile picture
  userroles: Array<UserRole>; // array of user roles (e.g. "admin", "customer")
  name: string; // name of user
}

export interface ILoginFormInputs {
  email: string;
  password: string;
}

export interface IGetProductsResponse {
  msg: string;
  code: number;
  data: Array<IProduct>;
}

export interface IGetProductsRequest {
  keyword?: string;
  user_id?: string;
  seller_id?: string;
}

export interface IProduct {
  stock_quantity: number;
  description: string;
  product_id: number;
  ImageURL: string | null;
  AmountInBasket: number;
  name: string;
  price: number; // actual price, possibly reduced price
  original_price?: number;
  available: boolean;
}

export interface IGetSingleProductResponse {
  msg: string;
  code: number;
  data: ISingleProduct;
}

export interface IGetSingleProductRequest {
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
  SellerImageURL: string | undefined;
  store_name: string;
  store_address: string;
  store_email: string;
  store_phone: string;
  coupon_code: string | undefined;
  coupon_description: string | undefined;
}

export interface IGetBasketResponse {
  msg: string;
  data: Array<IShoppingCartItem>;
}

export interface IShoppingCartItem {
  product_id: number;
  stock_quantity: number;
  ImageURL: string | null;
  name: string;
  price: number;
  original_price?: number;
  description: string;
  quantity: number;
}

export interface IPutShoppingCartResponse {
  msg: string;
}

export interface IGetOrdersRequest {
  user_id?: string;
  seller_id?: string;
}

export interface IGetUserOrdersResponse {
  msg: string;
  data: Array<IUserOrder>;
}

export interface IUserOrder {
  order_id: number;
  time: string;
  order_total: number;
  order_items: Array<IUserOrderItem>;
}

export interface IUserOrderItem {
  preshipping_price: number;
  products: Array<{
    product_id: number;
    name: string;
    price_per_piece: number;
    quantity: number;
  }>;
  seller_id: string;
  store_name: string;
  shipping_cost: number;
  status: string;
  total_price: number;
}

export interface IGetSellerOrdersResponse {
  msg: string;
  data: Array<ISellerOrder>;
}

export interface ISellerOrder {
  order_id: number;
  time: string;
  total_price: number;
  preshipping_price: number;
  shipping_cost: number;
  status: string;
  products: Array<{
    product_id: number;
    name: string;
    price_per_piece: number;
    quantity: number;
  }>;
}

export interface IGetUserResponse {
  msg: string;
  data: IUser;
}

export interface IGetUserRequest {
  user_id: string;
}

export interface IUser {
  user_id: string;
  name: string;
  email: string;
  address: string;
  ImageURL: string;
  password: string;
  userroles: Array<UserRole>;
}

export interface IPutUserRequest {
  user_id: string;
  name: string;
  email: string;
  address: string;
  password: string;
  user_type?: string;
}

export interface IPutUserResponse {
  msg: string;
}

export interface IPostUserRequest {
  name: string;
  email: string;
  address: string;
  password: string;
  user_type: string;
}

export interface IPostUserResponse {
  msg: string;
  data: {
    user_id: string;
  };
}

export interface IGetSalesStatisticsRequest {
  user_id: string;
}

export interface IGetSalesStatisticsResponse {
  msg: string;
  profit: number; // total amount money earned (just sum of sold products)
  total_sales: number; // total number of sales
  sales_data: Array<ISalesStatistics>;
  top_products: Array<ITopSalesProduct>;
}

export interface ITopSalesProduct {
  product_id: number;
  name: string;
  sales_volume: number; // number of times the product was sold
  ImageURL: string;
}

export interface ISalesStatistics {
  salesProfit: number; // total money of products sold
  startDate: string;
  endDate: string;
  name: string;
}

export interface IPutProductRequest {
  product_id: number;
  stock_quantity: number;
  price: number;
  name: string;
  available: boolean;
  description: string;
}

export interface IPutProductResponse {
  msg: string;
}

export interface IPostProductRequest {
  stock_quantity: number;
  price: number;
  name: string;
  available: boolean;
  description: string;
  seller_id: string;
}

export interface IPostProductResponse {
  msg: string;
  data: {
    product_id: number;
  };
}

export interface IGetUsersResponse {
  msg: string;
  data: Array<IUser>;
}

export interface IGetCouponsRequest {
  seller_id: string;
}

export interface IGetCouponsResponse {
  msg: string;
  data: Array<ICoupon>;
}

export interface ICoupon {
  code: string;
  description: string;
  start_time: string;
  end_time: string;
  type: "special_event" | "seasonal" | "shipping";
  percentage?: number;
  threshold?: number;
}

export interface ICheckOrderResponse {
  msg: string;
  data: {
    items_by_seller: Array<ICheckOrderItemsBySeller>;
    summed_price: number;
  };
}

export interface ICheckOrderItemsBySeller {
  preshipped_price: number;
  seller_id: number;
  items: Array<ICheckOrderItem>;
  shipping_cost: number;
  store_name: string;
  total_price: number;
}

export interface ICheckOrderItem {
  price_per_piece: number;
  product_id: number;
  quantity: number;
  toomany: boolean;
  total_price: number;
}

export interface IPostOrderResponse {
  msg: string;
}

export interface IPostCouponRequest {
  code: string;
  description: string;
  start_time: dayjs.Dayjs;
  end_time: dayjs.Dayjs;
  type: "special_event" | "seasonal" | "shipping";
  percentage?: number;
  threshold?: number;
  seller_id: string;
  product_ids: Array<number>;
}

export const getSalesStatisticMockData: IGetSalesStatisticsResponse = {
  msg: "Success",
  profit: 17328.53,
  total_sales: 194,
  sales_data: [
    {
      salesProfit: 2000,
      startDate: "1.5",
      endDate: "7.5.2021",
      name: "Week 1",
    },
    {
      salesProfit: 3200,
      startDate: "8.5",
      endDate: "14.5.2021",
      name: "Week 2",
    },
    {
      salesProfit: 2800,
      startDate: "15.5",
      endDate: "21.5.2021",
      name: "Week 3",
    },
    {
      salesProfit: 4000,
      startDate: "22.5",
      endDate: "28.5.2021",
      name: "Week 4",
    },
  ],
  top_products: [
    {
      product_id: 1,
      name: "Product 1",
      sales_volume: 100,
      ImageURL: "/api/img/user_placeholder.png",
    },
    {
      product_id: 2,
      name: "Product 2",
      sales_volume: 80,
      ImageURL: "/api/img/user_placeholder.png",
    },
    {
      product_id: 3,
      name: "Product 3",
      sales_volume: 60,
      ImageURL: "/api/img/user_placeholder.png",
    },
    {
      product_id: 4,
      name: "Product 4",
      sales_volume: 40,
      ImageURL: "/api/img/user_placeholder.png",
    },
    {
      product_id: 5,
      name: "Product 5",
      sales_volume: 20,
      ImageURL: "/api/img/user_placeholder.png",
    },
  ],
};

export const getCouponsResponseMockData: IGetCouponsResponse = {
  msg: "Success",
  data: [
    {
      code: "10OFF",
      description: "Mother's Day",
      start_time: "2021-05-01",
      end_time: "2021-05-09",
      type: "special_event",
      percentage: 10,
    },
    {
      code: "20OFF",
      description: "Summer Sale",
      start_time: "2021-06-01",
      end_time: "2021-06-09",
      type: "seasonal",
      percentage: 20,
    },
    {
      code: "30OFF",
      description: "Pride Month",
      start_time: "2021-12-01",
      end_time: "2021-12-09",
      type: "shipping",
      threshold: 100,
    },
  ],
};
