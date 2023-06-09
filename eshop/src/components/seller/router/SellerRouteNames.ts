// tslint:disable-next-line:typedef
export const SellerRouteNames = {
  DASHBOARD: "dashboard",
  ORDERS: "orders",
  PRODUCTS: "products",
  PRODUCT: "product/:product_id",
  COUPONS: "coupons",
};

export const sellerPrefix = (url: string) => "/seller/" + url;
