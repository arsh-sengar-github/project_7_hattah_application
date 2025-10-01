"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TiShoppingCart } from "react-icons/ti";
import Image from "next/image";
import ImagePlaceholder from "@/public/assets/images/image-placeholder.webp";
import { removeFromCart } from "@/store/reducer/cartReducer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { USER_CART, USER_CHECKOUT } from "@/routes/UserRoute";

const Cart = () => {
  const cart = useSelector((store) => store.cartStore);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="relative">
        <TiShoppingCart
          className="text-gray-500 cursor-pointer hover:text-primary"
          size={25}
        />
        <span className="absolute -right-2 -top-1 rounded-full w-4 h-4 flex justify-center items-center bg-red-500 text-xs text-white">
          {cart.count}
        </span>
      </SheetTrigger>
      <SheetContent className="sm:max-w-fit w-full flex flex-col gap-0">
        <SheetHeader className="border-b">
          <SheetTitle className="text-2xl font-bold">Cart</SheetTitle>
          <SheetDescription>
            Review the items in your cart, before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="h-[calc(100vh-50px)]">
          <div className="overflow-auto border-b h-[calc(100%-150px)]">
            {cart.count === 0 && (
              <div className="h-full flex justify-center items-center text-xl font-semibold">
                Empty
              </div>
            )}
            {cart.products?.map((product) => (
              <div
                className="border-b p-2 flex justify-between items-center"
                key={product.variantID}
              >
                <div className="flex items-center gap-2">
                  <Image
                    className="border rounded w-[50px] h-[50px]"
                    src={product?.media || ImagePlaceholder.src}
                    alt={product?.fullName}
                    width={100}
                    height={100}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {product?.fullName}
                    </h3>
                    <p className="flex items-center gap-1">
                      <span className="text-gray-500">{product?.color}</span>|
                      <span className="text-gray-500">{product?.size}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    className="text-red-500 cursor-pointer hover:text-primary hover:underline hover:underline-offset-1"
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
                    Remove
                  </button>
                  <p className="flex items-center gap-1">
                    <span className="text-gray-500">{product?.quantity}</span>x
                    <span className="text-gray-500">
                      {product?.sellingPrice.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 h-[25px]">
            <h2 className="flex justify-between items-center">
              <span className="text-xl font-semibold">MRP: </span>
              <span className="text-xl text-red-500 font-semibold">
                {maximumRetailPrice.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </h2>
            <h2 className="flex justify-between items-center">
              <span className="text-xl font-semibold">Discount: </span>
              <span className="text-xl text-red-500 font-semibold">
                -
                {discount.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </h2>
            <h2 className="mb-4 flex justify-between items-center">
              <span className="text-xl font-semibold">Amount: </span>
              <span className="text-xl text-red-500 font-semibold">
                {amount.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </h2>
            <div className="flex justify-between items-center gap-4">
              <Button
                className="w-1/2"
                variant="secondary"
                type="button"
                onClick={() => setIsOpen(false)}
                asChild
              >
                <Link href={USER_CART}>View</Link>
              </Button>
              {cart.count > 0 && (
                <Button
                  className="w-1/2"
                  type="button"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link href={USER_CHECKOUT}>Checkout</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
