"use client";
import { ADMIN_DASHBOARD, ADMIN_VARIANT } from "@/routes/AdminRoute";
import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastify } from "@/lib/toastify";
import axios from "axios";
import BreadCrumb from "@/components/custom/admin/breadCrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "@/components/custom/select";
import { Input } from "@/components/ui/input";
import { sizes } from "@/lib/utils";
import Image from "next/image";
import MediaModal from "@/components/custom/admin/mediaModal";
import ButtonLoading from "@/components/custom/buttonLoading";

const breadCrumbData = [
  {
    label: "Dashboard",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Variant",
    href: ADMIN_VARIANT,
  },
  {
    label: "Add Variant",
    href: "",
  },
];
const AddProductPage = () => {
  const { data: currProduct } = useFetch(
    "/api/product?size=10000&&deleteType=SD"
  );
  const [productOptions, setProductOptions] = useState([]);
  useEffect(() => {
    if (currProduct && currProduct.success) {
      const data = currProduct.data;
      const options = data.map((product) => ({
        label: product.fullName,
        value: product._id,
      }));
      setProductOptions(options);
    }
  }, [currProduct]);
  const formSchema = zSchema.pick({
    product: true,
    color: true,
    size: true,
    maximumRetailPrice: true,
    sellingPrice: true,
    discountPercentage: true,
    stockKeepingUnit: true,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      color: "",
      size: "",
      maximumRetailPrice: 0,
      sellingPrice: 0,
      discountPercentage: 0,
      stockKeepingUnit: "",
    },
  });
  useEffect(() => {
    const mrp = form.getValues("maximumRetailPrice") || 0;
    const sp = form.getValues("sellingPrice") || 0;
    let dp = 0;
    if (mrp > 0 && sp > 0) {
      dp = ((mrp - sp) / mrp) * 100;
    }
    form.setValue("discountPercentage", Math.round(dp));
  }, [form.watch("maximumRetailPrice"), form.watch("sellingPrice")]);
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const onAddVariantFormSubmit = async (values) => {
    setLoading(true);
    try {
      if (selectedMedia.length <= 0) {
        return toastify("error", "Select, at least, one media");
      }
      const mediaIDs = selectedMedia.map((media) => media._id);
      values.media = mediaIDs;
      const { data: response } = await axios.post("/api/variant/add", values);
      if (!response.success) {
        throw new Error(response.message);
      }
      form.reset();
      toastify("success", response.message);
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <BreadCrumb breadCrumbData={breadCrumbData} />
      <Card className="shadow-sm rounded p-0">
        <CardHeader className="border-b px-6 py-2 !pb-1">
          <h2 className="uppercase text-xl font-semibold">Add Variant</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAddVariantFormSubmit)}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Product<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            options={productOptions}
                            selected={field.value}
                            setSelected={field.onChange}
                            isMultiple={false}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Color<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Color" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Size<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            options={sizes}
                            selected={field.value}
                            setSelected={field.onChange}
                            isMultiple={false}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="maximumRetailPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Maximum Retail Price(MRP)
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="sellingPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Selling Price<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="90" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Discount Percentage(%)
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10"
                            readOnly
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="stockKeepingUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Stock Keeping Unit(SKU)
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="PRODUCT-COLOR-SIZE"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="md:col-span-2 border-dashed rounded p-2 text-center">
                <MediaModal
                  open={open}
                  setOpen={setOpen}
                  selectedMedia={selectedMedia}
                  setSelectedMedia={setSelectedMedia}
                  isMultiple={true}
                />
                {selectedMedia.length > 0 && (
                  <div className="my-2 flex flex-wrap justify-center items-center gap-1">
                    {selectedMedia.map((media) => (
                      <div className="w-[50px] h-[50px] border" key={media._id}>
                        <Image
                          className="size-full object-cover"
                          src={media?.url}
                          alt="image"
                          width={100}
                          height={100}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div
                  className="dark:bg-card w-[200px] mx-auto border rounded p-4 cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <span className="font-semibold">Select Media</span>
                </div>
              </div>
              <div className="my-2 flex justify-center items-center">
                <ButtonLoading
                  className="cursor-pointer"
                  text="Add"
                  loading={loading}
                  type="submit"
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductPage;
