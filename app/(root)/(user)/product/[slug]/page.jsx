import axios from "axios";
import ProductDetails from "@/components/custom/user/productDetails";

const ProductPage = async ({ params, searchParams }) => {
  const { slug } = await params;
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-public/details/${slug}`;
  const { color, size } = await searchParams;
  if (color && size) {
    url += `?color=${color}&size=${size}`;
  }
  const { data: productData } = await axios.get(url);
  if (!productData.success) {
    return (
      <div className="py-2 flex justify-center items-center">
        <span className="text-sm text-red-500">{error.message}</span>
      </div>
    );
  } else {
    return (
      <ProductDetails
        product={productData?.data?.product}
        variant={productData?.data?.variant}
        colors={productData?.data?.colors}
        sizes={productData?.data?.sizes}
        reviewCount={productData?.data?.reviewCount}
      />
    );
  }
};

export default ProductPage;
