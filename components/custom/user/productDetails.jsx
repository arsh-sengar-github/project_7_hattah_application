"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/reducer/cartReducer";
import { toastify } from "@/lib/toastify";
import Image from "next/image";
import Loading from "@/public/assets/icons/loading.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  USER_HOME,
  USER_SHOP,
  USER_PRODUCT_DETAILS,
  USER_CART,
} from "@/routes/UserRoute";
import Link from "next/link";
import ImagePlaceholder from "@/public/assets/images/image-placeholder.webp";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { decode, encode } from "entities";
import { HiMinus } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";
import ButtonLoading from "../buttonLoading";
import { Button } from "@/components/ui/button";
import ProductReviews from "./productReviews";

const ProductDetails = ({ product, variant, colors, sizes, reviewCount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeThumbnail, setActiveThumbnail] = useState();
  const onThumbnailChange = (thumbnailURL) => {
    setActiveThumbnail(thumbnailURL);
  };
  useEffect(() => {
    setActiveThumbnail(variant?.media[0]?.secure_url);
    setIsLoading(false);
  }, [variant]);
  const [quantity, setQuantity] = useState(1);
  const onQuantityChange = (event) => {
    if (event === "increase") {
      setQuantity((previous) => previous + 1);
    } else {
      if (quantity > 1) {
        setQuantity((previous) => previous - 1);
      }
    }
  };
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const cartStore = useSelector((store) => store.cartStore);
  useEffect(() => {
    if (cartStore.count > 0) {
      const existingProduct = cartStore.products.findIndex(
        (currProduct) =>
          currProduct.productID === product._id &&
          currProduct.variantID === variant._id
      );
      if (existingProduct >= 0) {
        setAddedToCart(true);
      } else {
        setAddedToCart(false);
      }
    }
  }, [variant]);
  const onAddToCart = () => {
    const inCartProduct = {
      productID: product._id,
      variantID: variant._id,
      media: variant?.media[0]?.secure_url,
      fullName: product.fullName,
      url: product.slug,
      color: variant.color,
      size: variant.size,
      maximumRetailPrice: variant.maximumRetailPrice,
      sellingPrice: variant.sellingPrice,
      quantity: quantity,
    };
    dispatch(addToCart(inCartProduct));
    setAddedToCart(true);
    toastify("success", "Product added to cart");
  };
  return (
    <div className="lg:px-32 px-4 py-2">
      {isLoading ? (
        <div className="size-full flex justify-center items-center">
          <Image src={Loading} alt="loading" width={50} height={50} />
        </div>
      ) : (
        <div>
          <div className="my-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={USER_HOME}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={USER_SHOP}>Shop</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={USER_PRODUCT_DETAILS(product?.slug)}>
                      {product?.fullName}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="my-4 flex lg:flex-row flex-col lg:justify-between lg:gap-4 gap-2">
            <div className="lg:flex lg:justify-center lg:gap-4 lg:w-1/2">
              <div className="lg:my-0 my-4 lg:flex-1 lg:order-last">
                <Image
                  className="border rounded w-full object-contain"
                  src={activeThumbnail || ImagePlaceholder.src}
                  alt="image"
                  width={800}
                  height={800}
                />
              </div>
              <div className="overflow-x-auto lg:overflow-y-auto scrollbar-thin lg:my-0 my-2 flex lg:w-32 w-full lg:flex-col flex-row gap-2">
                {variant?.media?.map((thumbnail) => (
                  <Image
                    className={`${
                      thumbnail.secure_url === activeThumbnail
                        ? "border-2 border-primary"
                        : "border"
                    } rounded lg:w-full w-16 h-16 object-cover object-top cursor-pointer`}
                    key={thumbnail._id}
                    src={thumbnail?.secure_url || ImagePlaceholder.src}
                    alt="image"
                    width={200}
                    height={200}
                    onClick={() => onThumbnailChange(thumbnail?.secure_url)}
                  />
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h1 className="mb-2 leading-snug md:text-4xl text-2xl font-bold">
                {product?.fullName}
              </h1>
              <div className="mb-2 flex items-center gap-1">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <span key={star}>
                      <FaStar className="text-yellow-500" />
                    </span>
                  ))}
                  {Array.from({ length: 5 - 5 }).map((_, star) => (
                    <span key={star}>
                      <CiStar className="text-yellow-500" />
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({reviewCount} reviews)
                </span>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm text-gray-500 line-through">
                  {variant?.maximumRetailPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </span>
                <span className="text-xl font-semibold">
                  {variant?.sellingPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </span>
                <span className="rounded-full px-2 py-1 bg-red-500 text-xs text-white font-medium">
                  -{variant?.discountPercentage}%
                </span>
              </div>
              <div
                className="mb-8 line-clamp-4 leading-relaxed text-sm"
                dangerouslySetInnerHTML={{
                  __html: decode(product?.description),
                }}
              />
              <div className="mb-2">
                <p className="mb-2 text-gray-500">
                  <span className="mr-2 text-xl text-black font-semibold">
                    Color:
                  </span>
                  {variant?.color}
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <Link
                      className={`border rounded-lg px-4 py-2 cursor-pointer ${
                        color === variant?.color && "bg-primary text-white"
                      } hover:bg-primary hover:text-white`}
                      key={color}
                      href={`${USER_PRODUCT_DETAILS(
                        product?.slug
                      )}?color=${color}&size=${variant?.size}`}
                      onClick={() => setIsLoading(true)}
                    >
                      {color}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <p className="mb-2 text-gray-500">
                  <span className="mr-2 text-xl text-black font-semibold">
                    Size:
                  </span>
                  {variant?.size}
                </p>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <Link
                      className={`border rounded-lg px-4 py-2 cursor-pointer ${
                        size === variant?.size && "bg-primary text-white"
                      } hover:bg-primary hover:text-white`}
                      key={size}
                      href={`${USER_PRODUCT_DETAILS(product?.slug)}?color=${
                        variant?.color
                      }&size=${size}`}
                      onClick={() => setIsLoading(true)}
                    >
                      {size}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <p className="mb-2 text-xl font-semibold">Quantity</p>
                <div className="overflow-hidden border rounded-full w-fit h-8 flex items-center">
                  <button
                    className="w-8 h-full flex justify-center items-center cursor-pointer hover:bg-primary hover:text-white"
                    type="button"
                    onClick={() => onQuantityChange("decrease")}
                  >
                    <HiMinus />
                  </button>
                  <input
                    className="border-none outline-none w-8 text-center"
                    type="text"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="w-8 h-full flex justify-center items-center cursor-pointer hover:bg-primary hover:text-white"
                    type="button"
                    onClick={() => onQuantityChange("increase")}
                  >
                    <HiPlus />
                  </button>
                </div>
              </div>
              <div>
                {!addedToCart ? (
                  <ButtonLoading
                    className="rounded-full w-full py-4 cursor-pointer"
                    text="Add to Cart"
                    type="button"
                    onClick={onAddToCart}
                  />
                ) : (
                  <Button
                    className="rounded-full w-full py-4 cursor-pointer"
                    type="button"
                    asChild
                  >
                    <Link href={USER_CART}>Go to Cart</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="shadow border rounded">
              <div className="border-b p-2">
                <h2 className="text-xl font-semibold">Description</h2>
              </div>
              <div className="p-2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: encode(product?.description),
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <ProductReviews product={product?._id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
