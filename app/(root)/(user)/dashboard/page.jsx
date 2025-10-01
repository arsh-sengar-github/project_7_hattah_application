"use client";
import useFetch from "@/hooks/use-fetch";
import { useSelector } from "react-redux";
import BreadCrumb from "@/components/custom/user/breadCrumb";
import PanelLayout from "@/components/custom/user/panelLayout";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import { USER_ORDER_DETAILS } from "@/routes/UserRoute";

const breadCrumb = {
  title: "Dashboard",
  links: [
    {
      label: "Dashboard",
    },
  ],
};
const DashboardPage = () => {
  const { data: dashboardData } = useFetch("/api/dashboard/user");
  const cartStore = useSelector((store) => store.cartStore);
  return (
    <div>
      <BreadCrumb props={breadCrumb} />
      <PanelLayout>
        <div className="shadow rounded">
          <div className="border-b p-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="p-4">
            <div className="mb-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div className="border rounded p-2 flex justify-between items-center gap-2">
                <div>
                  <h2 className="text-lg font-semibold">Order</h2>
                  <span className="text-lg text-gray-500 font-semibold">
                    {dashboardData?.data?.orderCount || 0}
                  </span>
                </div>
                <div className="rounded-full w-16 h-16 flex justify-center items-center bg-primary">
                  <MdOutlineShoppingBag className="text-white" size={25} />
                </div>
              </div>
              <div className="border rounded p-2 flex justify-between items-center gap-2">
                <div>
                  <h2 className="text-lg font-semibold">Cart</h2>
                  <span className="text-lg text-gray-500 font-semibold">
                    {cartStore?.count || 0}
                  </span>
                </div>
                <div className="rounded-full w-16 h-16 flex justify-center items-center bg-primary">
                  <TiShoppingCart className="text-white" size={25} />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">History</h2>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="border-b p-2 text-start text-nowrap text-gray-500 font-medium">
                        Index
                      </th>
                      <th className="border-b p-2 text-center text-nowrap text-gray-500 font-medium">
                        Order-ID
                      </th>
                      <th className="border-b p-2 text-center text-nowrap text-gray-500 font-medium">
                        Items
                      </th>
                      <th className="border-b p-2 text-end text-nowrap text-gray-500 font-medium">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData &&
                      dashboardData?.data?.recentOrders?.map((order, index) => (
                        <tr key={order._id}>
                          <td className="text-sm text-start text-gray-500">
                            {index + 1}
                          </td>
                          <td className="text-sm text-center text-gray-500">
                            <Link
                              className="hover:text-primary hover:underline hover:underline-offset-1"
                              href={USER_ORDER_DETAILS(order.order_id)}
                            >
                              {order.order_id}
                            </Link>
                          </td>
                          <td className="text-sm text-center text-gray-500">
                            {order.products.length}
                          </td>
                          <td className="text-sm text-end text-gray-500">
                            {order.amount.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </PanelLayout>
    </div>
  );
};

export default DashboardPage;
