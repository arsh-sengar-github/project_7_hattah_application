"use client";
import { USER_SHOP } from "@/routes/UserRoute";
import useWindowSize from "@/hooks/use-window";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import BreadCrumb from "@/components/custom/user/breadCrumb";
import Filter from "@/components/custom/user/filter";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Sort from "@/components/custom/user/sort";
import Image from "next/image";
import Loading from "@/public/assets/icons/loading.svg";
import Product from "@/components/custom/user/product";
import ButtonLoading from "@/components/custom/buttonLoading";

const breadCrumb = {
  title: "Shop",
  links: [
    {
      label: "Shop",
      href: USER_SHOP,
    },
  ],
};
const ShopPage = () => {
  const windowSize = useWindowSize();
  const searchParams = useSearchParams().toString();
  const [limit, setLimit] = useState(12);
  const [sorting, setSorting] = useState("default");
  const [openMobileFilter, setOpenMobileFilter] = useState(false);
  const fetchProduct = async (pageParams) => {
    const { data: productData } = await axios.get(
      `/api/shop?${searchParams}&limit=${limit}&page=${pageParams}&sorting=${sorting}`
    );
    if (!productData.success) {
      return null;
    }
    return productData.data;
  };
  const { data, error, hasNextPage, fetchNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["products", searchParams, limit, sorting],
      queryFn: async ({ pageParams }) => await fetchProduct(pageParams),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    });
  return (
    <div>
      <BreadCrumb props={breadCrumb} />
      <section className="my-16 lg:px-32 px-4 lg:flex">
        {windowSize.width > 1024 ? (
          <div className="w-64">
            <div className="sticky top-0 rounded p-4">
              <Filter />
            </div>
          </div>
        ) : (
          <Sheet
            open={openMobileFilter}
            onOpenChange={() => setOpenMobileFilter(false)}
          >
            <SheetContent className="block" side="left">
              <SheetHeader className="border-b">
                <SheetTitle>Filter</SheetTitle>
                <SheetDescription>
                  Apply filters below to refine your product search.
                </SheetDescription>
              </SheetHeader>
              <div className="overflow-auto p-4 h-[calc(100vh-128px)]">
                <Filter />
              </div>
            </SheetContent>
          </Sheet>
        )}

        <div className="lg:w-[calc(100%-16rem)]">
          <Sort
            limit={limit}
            setLimit={setLimit}
            sorting={sorting}
            setSorting={setSorting}
            openMobileFilter={openMobileFilter}
            setOpenMobileFilter={setOpenMobileFilter}
          />
          <div>
            {isFetching && (
              <div className="size-full flex justify-center items-center">
                <Image src={Loading} alt="loading" width={50} height={50} />
              </div>
            )}
            {error && (
              <div className="py-2 flex justify-center items-center">
                <span className="text-sm text-red-500">{error.message}</span>
              </div>
            )}
            <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-8 gap-4">
              {data &&
                data.pages.map((page) =>
                  page.products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))
                )}
            </div>
          </div>
          <div className="my-4 flex justify-center">
            {hasNextPage && (
              <ButtonLoading
                text="Discover More"
                loading={isFetching}
                type="button"
                onClick={fetchNextPage}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
