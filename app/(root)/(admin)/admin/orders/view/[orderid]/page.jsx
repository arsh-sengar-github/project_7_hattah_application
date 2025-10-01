"use client";
import { ADMIN_DASHBOARD, ADMIN_ORDERS } from "@/routes/AdminRoute";
import { use, useState, useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import axios from "axios";
import { toastify } from "@/lib/toastify";
import BreadCrumb from "@/components/custom/admin/breadCrumb";
import Image from "next/image";
import ImagePlaceholder from "@/public/assets/images/image-placeholder.webp";
import Link from "next/link";
import { USER_PRODUCT_DETAILS } from "@/routes/UserRoute";
import Select from "@/components/custom/select";
import ButtonLoading from "@/components/custom/buttonLoading";

const breadCrumbData = [
  {
    label: "Dashboard",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Orders",
    href: ADMIN_ORDERS,
  },
  {
    label: "View",
    href: "",
  },
];
const OrdersViewPage = ({ params }) => {
  const { orderid } = use(params);
  const { data: currOrderData, loading } = useFetch(
    `/api/order/get/${orderid}`
  );
  const [orderData, setOrderData] = useState();
  const statusOptions = [
    {
      label: "Unverified",
      value: "unverified",
    },
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Processing",
      value: "processing",
    },
    {
      label: "Shipped",
      value: "shipped",
    },
    {
      label: "Delivered",
      value: "delivered",
    },
    {
      label: "Cancelled",
      value: "cancelled",
    },
  ];
  const [orderStatus, setOrderStatus] = useState();
  useEffect(() => {
    if (currOrderData && currOrderData.success) {
      setOrderData(currOrderData.data);
      setOrderStatus(currOrderData.data?.status);
    }
  }, [currOrderData]);
  const [orderStatusChanging, setOrderStatusChanging] = useState(false);
  const onOrderStatusChange = async () => {
    setOrderStatusChanging(true);
    try {
      const { data: orderStatusData } = await axios.put(
        "/api/order/set-status",
        {
          _id: orderData?._id,
          status: orderStatus,
        }
      );
      if (!orderStatusData.success) {
        throw new Error(orderStatusData.message);
      }
      toastify("success", orderStatusData.message);
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setOrderStatusChanging(false);
    }
  };
  return (
    <div>
      <BreadCrumb breadCrumbData={breadCrumbData} />
      <div className="py-4">
        {!orderData ? (
          <div className="py-2 flex justify-center items-center">
            <span className="text-sm text-red-500">
              Failed to fetch the order's details.
            </span>
          </div>
        ) : (
          <div className="shadow-sm border rounded p-2 dark:bg-card">
            <div className="mb-2 border-b pb-2">
              <h1 className="text-2xl text-primary font-bold">Order Details</h1>
            </div>
            <div className="mb-2">
              <p className="text-gray-500">
                <span className="text-black font-medium dark:text-white">
                  Payment-ID:
                </span>{" "}
                {orderData?.payment_id}
              </p>
              <p className="text-gray-500">
                <span className="text-black font-medium dark:text-white">
                  Order-ID:
                </span>{" "}
                {orderData?.order_id}
              </p>
              <p className="text-gray-500">
                <span className="text-black font-medium dark:text-white">
                  Status:
                </span>{" "}
                {orderData?.status}
              </p>
            </div>
            <div>
              <table className="border w-full">
                <thead className="border-b md:table-header-group hidden">
                  <tr>
                    <th className="p-2 text-start">Product</th>
                    <th className="p-2 text-center">MRP</th>
                    <th className="p-2 text-center">Price</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2 text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData &&
                    orderData.products?.map((product) => (
                      <tr
                        className="md:table-row block border-b"
                        key={product.variantID._id}
                      >
                        <td className="p-2">
                          <div className="flex items-center gap-4">
                            <Image
                              src={
                                product?.variantID?.media[0]?.secure_url ||
                                ImagePlaceholder.src
                              }
                              alt={product?.productID?.fullName}
                              width={50}
                              height={50}
                            />
                            <div>
                              <h3 className="line-clamp-1 text-lg font-semibold">
                                <Link href={USER_PRODUCT_DETAILS(product.slug)}>
                                  {product?.productID?.fullName}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-500">
                                Color: {product?.variantID?.color}
                              </p>
                              <p className="text-sm text-gray-500">
                                Size: {product?.variantID?.size}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="md:p-2 px-4 py-2 md:table-cell flex justify-between text-center">
                          <span className="md:hidden font-medium">MRP</span>
                          <span>
                            {product?.maximumRetailPrice.toLocaleString(
                              "en-IN",
                              { style: "currency", currency: "INR" }
                            )}
                          </span>
                        </td>
                        <td className="md:p-2 px-4 py-2 md:table-cell flex justify-between text-center">
                          <span className="md:hidden font-medium">Price</span>
                          <span>
                            {product?.sellingPrice.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </span>
                        </td>
                        <td className="md:p-2 px-4 py-2 md:table-cell flex justify-between text-center">
                          <span className="md:hidden font-medium">
                            Quantity
                          </span>
                          <span>{product?.quantity}</span>
                        </td>
                        <td className="md:p-2 px-4 py-2 md:table-cell flex justify-between text-end">
                          <span className="md:hidden font-medium">Amount</span>
                          <span>
                            {(
                              product?.sellingPrice * product?.quantity
                            ).toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="my-8 border grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="p-2">
                  <h3 className="p-2 text-lg font-semibold">
                    Customer Details
                  </h3>
                  <hr />
                  <div>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="p-2 font-medium">Full Name: </td>
                          <td>{orderData?.fullName}</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Email Address: </td>
                          <td>{orderData?.emailAddress}</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Phone Number: </td>
                          <td>{orderData?.phoneNumber}</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Address: </td>
                          <td>
                            {orderData?.house}, {orderData?.road},{" "}
                            {orderData?.landmark}, {orderData?.city},{" "}
                            {orderData?.state}, {orderData?.country}, PIN Code -{" "}
                            {orderData?.personalIdentificationNumberCode}
                          </td>
                        </tr>
                        {orderData?.orderNote.length > 0 && (
                          <tr>
                            <td className="p-2 font-medium">Note: </td>
                            <td>{orderData?.orderNote}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="p-2 text-lg font-semibold">
                    Purchase Details
                  </h3>
                  <hr />
                  <div>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="p-2 font-medium">Amount: </td>
                          <td>
                            {orderData?.amount.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Discount: </td>
                          <td>
                            {(
                              orderData?.discount + orderData?.extraDiscount
                            ).toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Payable: </td>
                          <td>
                            {orderData?.payable.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr />
                  <h3 className="p-2 text-lg font-semibold">Status</h3>
                  <hr />
                  <div className="p-2 flex flex-col justify-center items-center gap-2">
                    <Select
                      placeholder="Select from"
                      options={statusOptions}
                      selected={orderStatus}
                      setSelected={setOrderStatus}
                    />
                    <ButtonLoading
                      className="cursor-pointer"
                      text="Change"
                      loading={orderStatusChanging}
                      type="button"
                      onClick={onOrderStatusChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersViewPage;
