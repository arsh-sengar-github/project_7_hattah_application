import BreadCrumb from "@/components/custom/user/breadCrumb";
import axios from "axios";
import Image from "next/image";
import ImagePlaceholder from "@/public/assets/images/image-placeholder.webp";
import Link from "next/link";
import { USER_PRODUCT_DETAILS } from "@/routes/UserRoute";
import MediaModel from "@/models/media.model";
import ProductModel from "@/models/product.model";
import VariantModel from "@/models/variant.model";

const breadCrumb = {
  title: "Order",
  links: [
    {
      label: "Order",
    },
  ],
};
const OrderPage = async ({ params }) => {
  const { orderid } = await params;
  const { data: orderData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/get/${orderid}`
  );
  return (
    <div>
      <BreadCrumb props={breadCrumb} />
      <div className="my-16 lg:px-32 py-4">
        {!(orderData && orderData.success) ? (
          <div className="py-2 flex justify-center items-center">
            <span className="text-sm text-red-500">
              Failed to fetch the order's details.
            </span>
          </div>
        ) : (
          <div className="py-2">
            <div className="mb-2">
              <p className="text-gray-500">
                <span className="text-black font-medium">Payment-ID:</span>{" "}
                {orderData?.data?.payment_id}
              </p>
              <p className="text-gray-500">
                <span className="text-black font-medium">Order-ID:</span>{" "}
                {orderData?.data?.order_id}
              </p>
              <p className="text-gray-500">
                <span className="text-black font-medium">Status:</span>{" "}
                {orderData?.data?.status}
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
                    orderData.data?.products?.map((product) => (
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
                          <td>{orderData?.data?.fullName}</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Email Address: </td>
                          <td>{orderData?.data?.emailAddress}</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Phone Number: </td>
                          <td>{orderData?.data?.phoneNumber}</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Address: </td>
                          <td>
                            {orderData?.data?.house}, {orderData?.data?.road},{" "}
                            {orderData?.data?.landmark}, {orderData?.data?.city}
                            , {orderData?.data?.state},{" "}
                            {orderData?.data?.country}, PIN Code -{" "}
                            {orderData?.data?.personalIdentificationNumberCode}
                          </td>
                        </tr>
                        {orderData?.data?.orderNote.length > 0 && (
                          <tr>
                            <td className="p-2 font-medium">Note: </td>
                            <td>{orderData?.data?.orderNote}</td>
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
                            {orderData?.data?.amount.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Discount: </td>
                          <td>
                            {(
                              orderData?.data?.discount +
                              orderData?.data?.extraDiscount
                            ).toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Payable: </td>
                          <td>
                            {orderData?.data?.payable.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default OrderPage;
