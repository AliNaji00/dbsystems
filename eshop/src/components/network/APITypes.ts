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

export interface IGetSingleProductResponse {
  msg: string;
  code: number;
  data: ISingleProduct;
}

export interface IGetSingleProductRequest {
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

export interface IGetBasketResponse {
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

export interface IPutShoppingCartResponse {
  msg: string;
}

export interface IGetOrdersResponse {
  msg: string;
  data: Array<IOrder>;
}

export interface IGetOrdersRequest {
  user_id: string;
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
  phone: string;
  address: string;
  ImageURL: string;
  password: string;
  userroles: Array<UserRole>;
}

export interface IPutUserRequest {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  ImageURL: string;
  password: string;
  userroles: Array<UserRole>;
}

export interface IGetSalesStatisticsRequest {
  user_id: string;
}

export interface IGetSalesStatisticsResponse {
  msg: string;
  profit: number;
  total_sales: number;
  data: Array<ISalesStatistics>;
}

export interface ISalesStatistics {
  salesVolume: number;
  startDate: string;
  endDate: string;
  name: string;
}

export const getSalesStatisticMockData: IGetSalesStatisticsResponse = {
  msg: "Success",
  profit: 17328.53,
  total_sales: 194,
  data: [
    {
      salesVolume: 2000,
      startDate: "2021-05-01",
      endDate: "2021-05-7",
      name: "Week 1",
    },
    {
      salesVolume: 3200,
      startDate: "2021-05-08",
      endDate: "2021-05-14",
      name: "Week 2",
    },
    {
      salesVolume: 2800,
      startDate: "2021-05-15",
      endDate: "2021-05-21",
      name: "Week 3",
    },
    {
      salesVolume: 4000,
      startDate: "2021-05-22",
      endDate: "2021-05-28",
      name: "Week 4",
    },
  ],
};

export const getUserResponseMockData: IGetUserResponse = {
  msg: "Success",
  data: {
    user_id: "1",
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "+33 123 456 789",
    address: "12 Street, City, Country",
    password: "123456",
    ImageURL: "/api/img/placeholder.png",
    userroles: ["customer"],
  },
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

export const getSingleProductResponseMockData: IGetSingleProductResponse = {
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
