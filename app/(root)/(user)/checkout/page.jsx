"use client";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import { clearCart, addToCart } from "@/store/reducer/cartReducer";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toastify } from "@/lib/toastify";
import z from "zod";
import { useRouter } from "next/navigation";
import {
  USER_ORDER_DETAILS,
  USER_SHOP,
  USER_PRODUCT_DETAILS,
} from "@/routes/UserRoute";
import Image from "next/image";
import Loading from "@/public/assets/icons/loading.svg";
import BreadCrumb from "@/components/custom/user/breadCrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaAddressBook } from "react-icons/fa";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import ButtonLoading from "@/components/custom/buttonLoading";
import ImagePlaceholder from "@/public/assets/images/image-placeholder.webp";
import { Input } from "@/components/ui/input";
import { CiCircleRemove } from "react-icons/ci";
import { Textarea } from "@/components/ui/textarea";
import Script from "next/script";

const breadCrumb = {
  title: "Checkout",
  links: [
    {
      label: "Checkout",
    },
  ],
};
const CheckoutPage = () => {
  const cart = useSelector((store) => store.cartStore);
  const { data: currVerifiedCartData } = useFetch("/api/cart/verify", "POST", {
    data: cart.products,
  });
  const [verifiedCartData, setVerifiedCartData] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (currVerifiedCartData && currVerifiedCartData.success) {
      const cartData = currVerifiedCartData.data;
      setVerifiedCartData(cartData);
      dispatch(clearCart());
      cartData.forEach((inCartProduct) => {
        dispatch(addToCart(inCartProduct));
      });
    }
  }, [currVerifiedCartData]);
  const [maximumRetailPrice, setMaximumRetailPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [payable, setPayable] = useState(0);
  const couponFormSchema = zSchema.pick({
    code: true,
    minimumPurchaseAmount: true,
  });
  const couponForm = useForm({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      code: "",
      minimumPurchaseAmount: amount,
    },
  });
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
    setPayable(totalAmount);
    couponForm.setValue("minimumPurchaseAmount", totalAmount);
  }, [cart]);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [extraDiscount, setExtraDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const onCouponApply = async (values) => {
    setIsApplyingCoupon(true);
    try {
      const { data: couponData } = await axios.post(
        "/api/coupon/apply",
        values
      );
      if (!couponData.success) {
        throw new Error(couponData.message);
      }
      const discountPercentage = couponData.data.discountPercentage;
      const discountAmount = (amount * discountPercentage) / 100;
      setExtraDiscount(discountAmount);
      setPayable(amount - discountAmount);
      setIsCouponApplied(true);
      setAppliedCouponCode(couponForm.getValues("code"));
      couponForm.resetField("code");
      toastify("success", couponData.message);
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setIsApplyingCoupon(false);
    }
  };
  const onCouponRemove = () => {
    setExtraDiscount(0);
    setPayable(amount);
    setIsCouponApplied(false);
    setAppliedCouponCode("");
  };
  const orderFormSchema = zSchema
    .pick({
      fullName: true,
      emailAddress: true,
      phoneNumber: true,
      country: true,
      state: true,
      city: true,
      landmark: true,
      road: true,
      house: true,
      personalIdentificationNumberCode: true,
      orderNote: true,
    })
    .extend({
      userID: z.string().optional(),
    });
  const authStore = useSelector((store) => store.authStore);
  const orderForm = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      userID: authStore?.auth?._id,
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      country: "",
      state: "",
      city: "",
      landmark: "",
      road: "",
      house: "",
      personalIdentificationNumberCode: "",
      orderNote: "",
    },
  });
  useEffect(() => {
    orderForm.setValue("userID", authStore?.auth?._id);
  }, [authStore]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const orderID = async (amount) => {
    try {
      const { data: orderIDData } = await axios.post("/api/order/get/id", {
        amount,
      });
      if (!orderIDData.success) {
        throw new Error(orderIDData.message);
      }
      return { success: true, order_id: orderIDData.data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  const router = useRouter();
  const onOrder = async (values) => {
    setIsOrdering(true);
    try {
      const generateOrderID = await orderID(amount);
      if (!generateOrderID.success) {
        throw new Error(generateOrderID.message);
      }
      const order_id = generateOrderID.order_id;
      const razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: payable * 100,
        currency: "INR",
        name: "Hattah",
        description: "Complete your purchase securely",
        image:
          "https://res.cloudinary.com/djudpwhsa/image/upload/v1759128020/logo_fsc9r8.png",
        order_id: order_id,
        handler: async function (response) {
          setPlacingOrder(true);
          const inCartProducts = verifiedCartData.map((inCartProduct) => ({
            productID: inCartProduct.productID,
            variantID: inCartProduct.variantID,
            fullName: inCartProduct.fullName,
            maximumRetailPrice: inCartProduct.maximumRetailPrice,
            sellingPrice: inCartProduct.sellingPrice,
            quantity: inCartProduct.quantity,
          }));
          const { data: orderResponseData } = await axios.post(
            "/api/order/add",
            {
              ...values,
              ...response,
              products: inCartProducts,
              discount: discount,
              amount: amount,
              extraDiscount: extraDiscount,
              payable: payable,
            }
          );
          if (orderResponseData.success) {
            dispatch(clearCart());
            orderForm.reset();
            toastify("success", orderResponseData.message);
            router.push(USER_ORDER_DETAILS(response.razorpay_order_id));
          } else {
            toastify("error", orderResponseData.message);
          }
          setPlacingOrder(false);
        },
        prefill: {
          name: values.fullName,
          email: values.emailAddress,
          contact: values.phoneNumber,
        },
        theme: {
          color: "#E27C20",
        },
      };
      if (typeof window.Razorpay === "undefined") {
        toastify("error", "Payment gateway not loaded. Please retry.");
        return;
      }
      const currRazorpay = new window.Razorpay(razorpayOptions);
      currRazorpay.on("payment.failed", function (response) {
        toastify("error", response.error.description);
      });
      currRazorpay.open();
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setIsOrdering(false);
    }
  };
  return (
    <div>
      {placingOrder ? (
        <div className="size-full flex justify-center items-center">
          <Image src={Loading} alt="loading" width={50} height={50} />
        </div>
      ) : (
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
              <div className="lg:w-[60%] w-full">
                <div className="mb-4 flex items-center gap-2">
                  <FaAddressBook size={25} />
                  <span className="font-medium">Details</span>
                </div>
                <div>
                  <Form {...orderForm}>
                    <form
                      className="grid grid-cols-2 gap-4"
                      onSubmit={orderForm.handleSubmit(onOrder)}
                    >
                      <div className="mb-2">
                        <FormField
                          control={orderForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="First Middle Last Names"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <div className="mb-2">
                        <FormField
                          control={orderForm.control}
                          name="emailAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Email Address"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <div className="mb-2">
                        <FormField
                          control={orderForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Phone Number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <div className="mb-2">
                        <FormField
                          control={orderForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Country"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <div className="mb-2">
                        <FormField
                          control={orderForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="State"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <div className="mb-2">
                        <FormField
                          control={orderForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="City"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <div className="mb-2">
                        <FormField
                          control={orderForm.control}
                          name="landmark"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Landmark"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <div className="mb-2">
                        <FormField
                          control={orderForm.control}
                          name="road"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Road"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <div className="mb-2">
                        <FormField
                          control={orderForm.control}
                          name="house"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="House"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <div className="mb-2">
                        <FormField
                          control={orderForm.control}
                          name="personalIdentificationNumberCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="PIN Code"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <div className="mb-2 col-span-2">
                        <FormField
                          control={orderForm.control}
                          name="orderNote"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Make sure, that my order is..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <div className="mb-2 col-span-2 flex justify-center items-center">
                        <ButtonLoading
                          className="rounded-full px-4 py-2 bg-black cursor-pointer"
                          text="Order"
                          loading={isOrdering}
                          type="submit"
                        />
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
              <div className="lg:w-[40%] w-full">
                <div className="p-2">
                  <h2 className="text-xl font-semibold">Summary</h2>
                  <div>
                    <table className="border w-full">
                      <tbody>
                        {verifiedCartData &&
                          verifiedCartData?.map((inCartProduct) => (
                            <tr key={inCartProduct.variantID}>
                              <td className="p-2">
                                <div className="flex items-center gap-4">
                                  <Image
                                    className="border rounded"
                                    src={
                                      inCartProduct?.media ||
                                      ImagePlaceholder.src
                                    }
                                    alt={inCartProduct?.fullName}
                                    width={50}
                                    height={50}
                                  />
                                  <div>
                                    <h3 className="line-clamp-1 text-lg font-semibold">
                                      <Link
                                        href={USER_PRODUCT_DETAILS(
                                          inCartProduct.url
                                        )}
                                      >
                                        {inCartProduct?.fullName}
                                      </Link>
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      Color: {inCartProduct?.color}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Size: {inCartProduct?.size}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  <p className="text-sm text-nowrap">
                                    <span className="text-sm text-gray-500">
                                      {inCartProduct?.quantity}
                                    </span>
                                    x
                                    <span className="text-sm text-gray-500">
                                      {inCartProduct?.sellingPrice.toLocaleString(
                                        "en-IN",
                                        { style: "currency", currency: "INR" }
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
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
                          <td className="py-2 font-medium">Amount</td>
                          <td className="py-2 text-end">
                            {amount.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                        {extraDiscount > 0 && (
                          <tr>
                            <td className="py-2 font-medium">Extra Discount</td>
                            <td className="py-2 text-end">
                              -
                              {extraDiscount.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td className="py-4 text-lg font-semibold">
                            Payable
                          </td>
                          <td className="py-4 text-end">
                            {payable.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mb-2">
                      {!isCouponApplied ? (
                        <Form {...couponForm}>
                          <form
                            className="flex justify-between gap-4"
                            onSubmit={couponForm.handleSubmit(onCouponApply)}
                          >
                            <div className="w-[calc(100%-100px)]">
                              <FormField
                                control={couponForm.control}
                                name="code"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        placeholder="Code"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              ></FormField>
                            </div>
                            <div className="w-[100px]">
                              <ButtonLoading
                                className="w-full cursor-pointer"
                                text="Apply"
                                loading={isApplyingCoupon}
                                type="submit"
                              />
                            </div>
                          </form>
                        </Form>
                      ) : (
                        <div className="border rounded-lg px-4 py-2 flex justify-between">
                          <div>
                            <h4 className="text-sm">Coupon</h4>
                            <p className="text-xs text-gray-500">
                              Code: {appliedCouponCode}
                            </p>
                          </div>
                          <button
                            className="text-red-500 cursor-pointer"
                            type="button"
                            onClick={onCouponRemove}
                          >
                            <CiCircleRemove size={25} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
