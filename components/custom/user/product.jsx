import Link from "next/link";
import { USER_PRODUCT_DETAILS } from "@/routes/UserRoute";
import Image from "next/image";
import ImagePlaceholder from "@/public/assets/images/image-placeholder.webp";

const Product = ({ product }) => {
  return (
    <div className="overflow-hidden border rounded-lg hover:shadow-lg">
      <Link href={USER_PRODUCT_DETAILS(product.slug)}>
        <Image
          className="w-full object-cover object-top sm:h-[200px] h-[100px]"
          src={product?.media[0]?.secure_url || ImagePlaceholder.src}
          title={product?.media[0]?.title || "product"}
          alt={product?.media[0]?.alt || "image"}
          width={400}
          height={400}
        />
        <div className="border-t p-2">
          <h3>{product?.fullName}</h3>
          <p className="flex gap-1">
            <span className="text-sm text-gray-500 line-through">
              {product?.maximumRetailPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="text-sm font-semibold">
              {product?.sellingPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
