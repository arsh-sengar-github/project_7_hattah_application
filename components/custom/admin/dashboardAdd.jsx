import Link from "next/link";
import {
  ADMIN_CATEGORY_ADD,
  ADMIN_PRODUCT_ADD,
  ADMIN_COUPON_ADD,
  ADMIN_MEDIA,
} from "@/routes/AdminRoute";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { RiCoupon2Line } from "react-icons/ri";
import { MdOutlinePermMedia } from "react-icons/md";

const DashboardAdd = () => {
  return (
    <div className="py-2 grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-8 gap-4">
      <Link href={ADMIN_CATEGORY_ADD}>
        <div className="shadow rounded-lg p-2 flex justify-between items-center bg-gradient-to-tr from-red-400 via-red-500 to-red-600 dark:bg-card">
          <h2 className="text-white font-medium dark:text-black">
            Add Category
          </h2>
          <span className="border rounded-full w-8 h-8 flex justify-center items-center bg-red-500 text-white dark:border-black dark:text-black">
            <BiCategory />
          </span>
        </div>
      </Link>
      <Link href={ADMIN_PRODUCT_ADD}>
        <div className="shadow rounded-lg p-2 flex justify-between items-center bg-gradient-to-tr from-yellow-400 via-yellow-500 to-yellow-600 dark:bg-card">
          <h2 className="text-white font-medium dark:text-black">
            Add Product
          </h2>
          <span className="border rounded-full w-8 h-8 flex justify-center items-center bg-yellow-500 text-white dark:border-black dark:text-black">
            <IoShirtOutline />
          </span>
        </div>
      </Link>
      <Link href={ADMIN_COUPON_ADD}>
        <div className="shadow rounded-lg p-2 flex justify-between items-center bg-gradient-to-tr from-green-400 via-green-500 to-green-600 dark:bg-card">
          <h2 className="text-white font-medium dark:text-black">Add Coupon</h2>
          <span className="border rounded-full w-8 h-8 flex justify-center items-center bg-green-500 text-white dark:border-black dark:text-black">
            <RiCoupon2Line />
          </span>
        </div>
      </Link>
      <Link href={ADMIN_MEDIA}>
        <div className="shadow rounded-lg p-2 flex justify-between items-center bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-600 dark:bg-card">
          <h2 className="text-white font-medium dark:text-black">
            Upload Media
          </h2>
          <span className="border rounded-full w-8 h-8 flex justify-center items-center bg-blue-500 text-white dark:border-black dark:text-black">
            <MdOutlinePermMedia />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default DashboardAdd;
