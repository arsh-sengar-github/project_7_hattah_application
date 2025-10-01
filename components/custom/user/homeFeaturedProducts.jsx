import axios from "axios";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Product from "./product";

const HomeFeaturedProducts = async () => {
  const { data: productData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-public`
  );
  if (!productData) {
    return null;
  }
  return (
    <div className="lg:px-32 px-4 py-2">
      <div className="mb-2 flex justify-between items-center">
        <h2 className="sm:text-4xl text-2xl sm:font-bold font-semibold">
          Featured Products
        </h2>
        <Link
          className="flex items-center gap-2 underline underline-offset-4 hover:text-primary"
          href=""
        >
          View All
          <FaArrowRight />
        </Link>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-8 gap-2">
        {productData.success ? (
          productData.data.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <div className="py-4 text-center">Nothing to see, here.</div>
        )}
      </div>
    </div>
  );
};

export default HomeFeaturedProducts;
