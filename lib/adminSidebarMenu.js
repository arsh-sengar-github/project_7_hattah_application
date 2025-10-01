import { AiOutlineDashboard } from "react-icons/ai";
import {
  ADMIN_DASHBOARD,
  ADMIN_CATEGORY_ADD,
  ADMIN_CATEGORY,
  ADMIN_PRODUCT_ADD,
  ADMIN_PRODUCT,
  ADMIN_VARIANT_ADD,
  ADMIN_VARIANT,
  ADMIN_COUPON_ADD,
  ADMIN_COUPON,
  ADMIN_ORDERS,
  ADMIN_CUSTOMERS,
  ADMIN_REVIEW,
  ADMIN_MEDIA,
} from "@/routes/AdminRoute";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { RiCoupon2Line } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlinePermMedia } from "react-icons/md";

export const adminSidebarMenu = [
  {
    title: "Dashboard",
    icon: AiOutlineDashboard,
    url: ADMIN_DASHBOARD,
  },
  {
    title: "Category",
    icon: BiCategory,
    url: "#",
    submenu: [
      {
        title: "Add Catergory",
        url: ADMIN_CATEGORY_ADD,
      },
      {
        title: "All Catergories",
        url: ADMIN_CATEGORY,
      },
    ],
  },
  {
    title: "Product",
    icon: IoShirtOutline,
    url: "#",
    submenu: [
      {
        title: "Add Product",
        url: ADMIN_PRODUCT_ADD,
      },
      {
        title: "Add Variant",
        url: ADMIN_VARIANT_ADD,
      },
      {
        title: "All Products",
        url: ADMIN_PRODUCT,
      },
      {
        title: "All Variants",
        url: ADMIN_VARIANT,
      },
    ],
  },
  {
    title: "Coupon",
    icon: RiCoupon2Line,
    url: "#",
    submenu: [
      {
        title: "Add Coupon",
        url: ADMIN_COUPON_ADD,
      },
      {
        title: "All Coupons",
        url: ADMIN_COUPON,
      },
    ],
  },
  {
    title: "Orders",
    icon: MdOutlineShoppingBag,
    url: ADMIN_ORDERS,
  },
  {
    title: "Customers",
    icon: LuUserRound,
    url: ADMIN_CUSTOMERS,
  },
  {
    title: "Review",
    icon: IoMdStarOutline,
    url: ADMIN_REVIEW,
  },
  {
    title: "Media",
    icon: MdOutlinePermMedia,
    url: ADMIN_MEDIA,
  },
];
