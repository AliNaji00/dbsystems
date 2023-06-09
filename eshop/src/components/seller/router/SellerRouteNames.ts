// tslint:disable-next-line:typedef
export const SellerRouteNames = {
  DASHBOARD: "dashboard",
  ORDERS: "orders",
  PRODUCTS: "products",
  COUPONS: "coupons",
  PRODUCT: "product/:product_id",
  CREATE_PROCUCT: "create-product",
};

export const sellerPrefix = (url: string) => "/seller/" + url;
