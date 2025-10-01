"use client";
import useFetch from "@/hooks/use-fetch";
import BreadCrumb from "@/components/custom/user/breadCrumb";
import PanelLayout from "@/components/custom/user/panelLayout";
import Image from "next/image";
import Loading from "@/public/assets/icons/loading.svg";
import Link from "next/link";
import { USER_ORDER_DETAILS } from "@/routes/UserRoute";

const breadCrumb = {
  title: "History",
  links: [
    {
      label: "History",
    },
  ],
};
const HistoryPage = () => {
  const { data: orderData, loading } = useFetch("/api/history");
  return (
    <div>
      <BreadCrumb props={breadCrumb} />
      <PanelLayout>
        <div className="shadow rounded">
          <div className="border-b p-4">
            <h1 className="text-xl font-semibold">History</h1>
          </div>
          {loading ? (
            <div className="size-full flex justify-center items-center">
              <Image src={Loading} alt="loading" width={50} height={50} />
            </div>
          ) : (
            <div className="overflow-auto p-4">
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
                  {orderData &&
                    orderData?.data?.map((order, index) => (
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
          )}
        </div>
      </PanelLayout>
    </div>
  );
};

export default HistoryPage;
