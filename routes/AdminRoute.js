export const ADMIN_DASHBOARD = "/admin/dashboard";
export const ADMIN_CATEGORY = "/admin/category";
export const ADMIN_CATEGORY_ADD = "/admin/category/add";
export const ADMIN_CATEGORY_EDIT = (id) =>
  id ? `/admin/category/edit/${id}` : "";
export const ADMIN_PRODUCT = "/admin/product";
export const ADMIN_PRODUCT_ADD = "/admin/product/add";
export const ADMIN_PRODUCT_EDIT = (id) =>
  id ? `/admin/product/edit/${id}` : "";
export const ADMIN_VARIANT = "/admin/variant";
export const ADMIN_VARIANT_ADD = "/admin/variant/add";
export const ADMIN_VARIANT_EDIT = (id) =>
  id ? `/admin/variant/edit/${id}` : "";
export const ADMIN_COUPON = "/admin/coupon";
export const ADMIN_COUPON_ADD = "/admin/coupon/add";
export const ADMIN_COUPON_EDIT = (id) => (id ? `/admin/coupon/edit/${id}` : "");
export const ADMIN_ORDERS = "/admin/orders";
export const ADMIN_ORDERS_VIEW = (orderid) =>
  orderid ? `/admin/orders/view/${orderid}` : "";
export const ADMIN_CUSTOMERS = "/admin/customers";
export const ADMIN_REVIEW = "/admin/review";
export const ADMIN_MEDIA = "/admin/media";
export const ADMIN_MEDIA_EDIT = (id) => (id ? `/admin/media/edit/${id}` : "");
export const ADMIN_TRASH = "/admin/trash";
