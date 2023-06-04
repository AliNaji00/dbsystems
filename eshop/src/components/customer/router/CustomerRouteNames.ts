// tslint:disable-next-line:typedef
export const CustomerRouteNames = {
  HOME: "home",
  ORDER_HISTORY: "order-history",
  SHOPPING_CART: "shopping-cart",
  PRODUCT: ":product_id",
};

export const customerPrefix = (url: string) => "/customer/" + url;
