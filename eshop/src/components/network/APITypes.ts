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

export interface IGetOrdersResponse {
  msg: string;
  data: Array<IOrder>;
}

export interface IGetOrdersRequest {
  user_id: string;
  seller_id?: string;
}

export interface IOrder {
  order_id: number;
  order_date: string;
  order_status: string;
  order_total: number;
  order_items: Array<IOrderItem>;
}

// shipping gleich pro product
// in order gespeichert werden die preise der produkte nach applyen aller discounts
// order total ist summe der produkte + shipping
// ab einem gewissen threshold des gesamtpreises für einen gewissen händler wird shipping für jedes Item dieses händlers gratis (wenn coupon im FE validiert wird)
// status wird für jedes Item von einem Händler derselbe angezeigt
// order_status ist entweder "pending", "processing" oder "delivered",
// pending wenn noch keine produkte shipped wurden, processing wenn mindestens ein produkt shipped wurde, delivered wenn alle produkte shipped wurden

export interface IOrderItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  status: string;
  shipping_cost: number;
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

export const getOrdersResponseMockData: IGetOrdersResponse = {
  msg: "Success",
  data: [
    {
      order_id: 1,
      order_date: "2021-05-01",
      order_status: "pending",
      order_total: 100,
      order_items: [
        {
          product_id: 1,
          name: "Product 1",
          price: 10,
          quantity: 1,
          status: "pending",
          shipping_cost: 10,
        },
        {
          product_id: 2,
          name: "Product 2",
          price: 20,
          quantity: 2,
          status: "pending",
          shipping_cost: 10,
        },
      ],
    },
    {
      order_id: 2,
      order_date: "2021-05-01",
      order_status: "processing",
      order_total: 100,
      order_items: [
        {
          product_id: 3,
          name: "Product 3",
          price: 30,
          quantity: 3,
          status: "processing",
          shipping_cost: 10,
        },
        {
          product_id: 4,
          name: "Product 4",
          price: 40,
          quantity: 4,
          status: "processing",
          shipping_cost: 10,
        },
      ],
    },
    {
      order_id: 3,
      order_date: "2021-05-01",
      order_status: "delivered",
      order_total: 100,
      order_items: [
        {
          product_id: 5,
          name: "Product 5",
          price: 50,
          quantity: 5,
          status: "delivered",
          shipping_cost: 10,
        },
        {
          product_id: 6,
          name: "Product 6",
          price: 60,
          quantity: 6,
          status: "delivered",
          shipping_cost: 10,
        },
      ],
    },
  ],
};

export const getUsersResponseMockData: IGetUsersResponse = {
  msg: "Success",
  data: [
    {
      user_id: "1",
      name: "User 1",
      email: "yourmum@example.com",
      address: "1, Your Mum's House, Your Mum's Street, Your Mum's City",
      ImageURL: "/api/img/user_placeholder.png",
      password: "password",
      userroles: ["admin"],
    },
    {
      user_id: "2",
      name: "User 2",
      email: "idgaf@example.com",
      address: "2, IDGAF Street, IDGAF City",
      ImageURL: "/api/img/user_placeholder.png",
      password: "password",
      userroles: ["customer", "seller"],
    },
    {
      user_id: "3",
      name: "User 3",
      email: "hard@bass.com",
      address: "3, Hard Bass Street, Hard Bass City",
      ImageURL: "/api/img/user_placeholder.png",
      password: "password",
      userroles: ["customer"],
    },
    {
      user_id: "4",
      name: "User 4",
      email: "pokemon@go.everyday",
      address: "4, Pokemon Street, Pokemon City",
      ImageURL: "/api/img/user_placeholder.png",
      password: "password",
      userroles: ["customer"],
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
