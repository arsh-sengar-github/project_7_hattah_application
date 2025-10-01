"use client";
import useFetch from "@/hooks/use-fetch";
import Link from "next/link";
import {
  ADMIN_CATEGORY,
  ADMIN_PRODUCT,
  ADMIN_ORDERS,
  ADMIN_CUSTOMERS,
} from "@/routes/AdminRoute";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";

const DashboardCount = () => {
  const { data: countData } = useFetch(`/api/dashboard/admin/count`);
  return (
    <div className="py-2 grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-8 gap-4">
      <Link href={ADMIN_CATEGORY}>
        <div className="shadow border border-l-4 border-l-red-500 rounded-lg p-2 flex justify-between items-center dark:bg-card">
          <div>
            <h2 className="text-black font-medium dark:text-white">
              Categories
            </h2>
            <span className="text-xl font-bold">
              {countData?.data?.category || 0}
            </span>
          </div>
          <div>
            <span className="border rounded-full w-8 h-8 flex justify-center items-center bg-red-500 text-white dark:text-black">
              <BiCategory />
            </span>
          </div>
        </div>
      </Link>
      <Link href={ADMIN_PRODUCT}>
        <div className="shadow border border-l-4 border-l-yellow-500 rounded-lg p-2 flex justify-between items-center dark:bg-card">
          <div>
            <h2 className="text-black font-medium dark:text-white">Products</h2>
            <span className="text-xl font-bold">
              {countData?.data?.product || 0}
            </span>
          </div>
          <div>
            <span className="border rounded-full w-8 h-8 flex justify-center items-center bg-yellow-500 text-white dark:text-black">
              <IoShirtOutline />
            </span>
          </div>
        </div>
      </Link>
      <Link href={ADMIN_ORDERS}>
        <div className="shadow border border-l-4 border-l-green-500 rounded-lg p-2 flex justify-between items-center dark:bg-card">
          <div>
            <h2 className="text-black font-medium dark:text-white">Orders</h2>
            <span className="text-xl font-bold">
              {countData?.data?.orders || 0}
            </span>
          </div>
          <div>
            <span className="border rounded-full w-8 h-8 flex justify-center items-center bg-green-500 text-white dark:text-black">
              <MdOutlineShoppingBag />
            </span>
          </div>
        </div>
      </Link>
      <Link href={ADMIN_CUSTOMERS}>
        <div className="shadow border border-l-4 border-l-blue-500 rounded-lg p-2 flex justify-between items-center dark:bg-card">
          <div>
            <h2 className="text-black font-medium dark:text-white">
              Customers
            </h2>
            <span className="text-xl font-bold">
              {countData?.data?.customers || 0}
            </span>
          </div>
          <div>
            <span className="border rounded-full w-8 h-8 flex justify-center items-center bg-blue-500 text-white dark:text-black">
              <LuUserRound />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DashboardCount;
