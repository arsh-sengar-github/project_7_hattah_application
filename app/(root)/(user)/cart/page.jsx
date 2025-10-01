"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import BreadCrumb from "@/components/custom/user/breadCrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  USER_CHECKOUT,
  USER_PRODUCT_DETAILS,
  USER_SHOP,
} from "@/routes/UserRoute";
import Image from "next/image";
import ImagePlaceholder from "@/public/assets/images/image-placeholder.webp";
import { HiMinus, HiPlus } from "react-icons/hi";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/store/reducer/cartReducer";
import { CiCircleRemove } from "react-icons/ci";

const breadCrumb = {
  title: "Cart",
  links: [
    {
      label: "Cart",
    },
  ],
};
const CartPage = () => {
  const cart = useSelector((store) => store.cartStore);
  const dispatch = useDispatch();
  const [maximumRetailPrice, setMaximumRetailPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    const inCartProduct = cart.products;
    const totalMaximumRetailPrice = inCartProduct.reduce(
      (sum, product) => sum + product.maximumRetailPrice * product.quantity,
      0
    );
    setMaximumRetailPrice(totalMaximumRetailPrice);
    const totalDiscount = inCartProduct.reduce(
      (sum, product) =>
        sum +
        (product.maximumRetailPrice - product.sellingPrice) * product.quantity,
      0
    );
    setDiscount(totalDiscount);
    const totalAmount = inCartProduct.reduce(
      (sum, product) => sum + product.sellingPrice * product.quantity,
      0
    );
    setAmount(totalAmount);
  }, [cart]);
  return (
    <div>
      <BreadCrumb props={breadCrumb} />
      {cart.count === 0 ? (
        <div className="w-screen h-[50vh] flex justify-center items-center">
          <div className="text-center">
            <h1 className="mb-8 text-4xl font-bold">Forgot Something?</h1>
            <Button type="button" asChild>
              <Link href={USER_SHOP}>Get Something</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="my-16 lg:px-32 px-4 flex lg:flex-nowrap flex-wrap gap-8">
          <div className="lg:w-[70%] w-full">
            <table className="border w-full">
              <thead className="border-b md:table-header-group hidden">
                <tr>
                  <th className="p-2 text-start">Product</th>
                  <th className="p-2 text-center">Quantity</th>
                  <th className="p-2 text-center">Price</th>
                  <th className="p-2 text-center">Amount</th>
                  <th className="p-2 text-end">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((product) => (
                  <tr
                    className="border-b md:table-row block"
                    key={product.variantID}
                  >
                    <td className="p-2">
                      <div className="flex items-center gap-4">
                        <Image
                          src={product?.media || ImagePlaceholder.src}
                          alt={product?.fullName}
                          width={50}
                          height={50}
                        />
                        <div>
                          <h3 className="line-clamp-1 text-lg font-semibold cursor-pointer hover:text-primary">
                            <Link href={USER_PRODUCT_DETAILS(product.url)}>
                              {product?.fullName}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500">
                            Color: {product?.color}
                          </p>
                          <p className="text-sm text-gray-500">
                            Size: {product?.size}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="md:p-4 px-4 py-2 md:table-cell flex justify-between">
                      <span className="md:hidden font-medium">Quantity</span>
                      <div className="flex justify-center">
                        <div className="overflow-hidden border rounded-full w-fit md:h-8 h-6 flex items-center">
                          <button
                            className="md:w-8 w-6 h-full flex justify-center items-center cursor-pointer hover:bg-primary hover:text-white"
                            type="button"
                            onClick={() =>
                              dispatch(
                                decreaseQuantity({
                                  productID: product.productID,
                                  variantID: product.variantID,
                                })
                              )
                            }
                          >
                            <HiMinus />
                          </button>
                          <input
                            className="border-none outline-none md:w-8 w-6 text-center"
                            type="text"
                            value={product?.quantity}
                            readOnly
                          />
                          <button
                            className="md:w-8 w-6 h-full flex justify-center items-center cursor-pointer hover:bg-primary hover:text-white"
                            type="button"
                            onClick={() =>
                              dispatch(
                                increaseQuantity({
                                  productID: product.productID,
                                  variantID: product.variantID,
                                })
                              )
                            }
                          >
                            <HiPlus />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="md:p-4 px-4 py-2 md:table-cell flex justify-between text-center">
                      <span className="md:hidden font-medium">Price</span>
                      <span>
                        {product?.sellingPrice.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    </td>
                    <td className="md:p-4 px-4 py-2 md:table-cell flex justify-between text-end">
                      <span className="md:hidden font-medium">Amount</span>
                      <span>
                        {(
                          product?.quantity * product?.sellingPrice
                        ).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    </td>
                    <td className="md:p-4 px-4 py-2 md:table-cell flex justify-between text-center">
                      <span className="md:hidden font-medium">Remove</span>
                      <button
                        className="text-red-500 cursor-pointer hover:text-primary"
                        type="button"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              productID: product.productID,
                              variantID: product.variantID,
                            })
                          )
                        }
                      >
                        <CiCircleRemove size={25} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:w-[30%] w-full">
            <div className="p-2">
              <h2 className="text-xl font-semibold">Summary</h2>
              <div>
                <table className="mb-4 w-full">
                  <tbody>
                    <tr>
                      <td className="py-2 font-medium">MRP</td>
                      <td className="py-2 text-end">
                        {maximumRetailPrice.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Discount</td>
                      <td className="py-2 text-end">
                        -
                        {discount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 text-lg font-semibold">Amount</td>
                      <td className="py-4 text-end">
                        {amount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Button
                  className="mb-2 rounded-full w-full bg-black cursor-pointer"
                  type="button"
                  asChild
                >
                  <Link href={USER_CHECKOUT}>Checkout</Link>
                </Button>
                <div className="text-center">
                  <Link
                    className="hover:text-primary hover:underline hover:underline-offset-1"
                    href={USER_SHOP}
                  >
                    Shop More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
