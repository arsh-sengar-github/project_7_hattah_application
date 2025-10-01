export const USER_HOME = "/";
export const USER_ABOUT = "/about";
export const USER_SHOP = "/shop";
export const USER_PRODUCT_DETAILS = (slug) =>
  slug ? `/product/${slug}` : "/product";
export const USER_CART = "/cart";
export const USER_CHECKOUT = "/checkout";
export const USER_ORDER_DETAILS = (orderid) => `/order/${orderid}`;
export const USER_CONTACT = "/contact";
export const USER_REGISTER = "/auth/register";
export const USER_LOGIN = "/auth/login";
export const USER_RESET_PASSWORD = "/auth/reset-password";
export const USER_DASHBOARD = "/dashboard";
export const USER_PROFILE = "/profile";
export const USER_HISTORY = "/history";
