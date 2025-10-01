"use client";
import { ADMIN_DASHBOARD, ADMIN_PRODUCT } from "@/routes/AdminRoute";
import useFetch from "@/hooks/use-fetch";
import { use, useState, useEffect } from "react";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
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
import { Input } from "@/components/ui/input";
import Select from "@/components/custom/select";
import Editor from "@/components/custom/admin/editor";
import Image from "next/image";
import MediaModal from "@/components/custom/admin/mediaModal";
import ButtonLoading from "@/components/custom/buttonLoading";

const breadCrumbData = [
  {
    label: "Dashboard",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Product",
    href: ADMIN_PRODUCT,
  },
  {
    label: "Edit Product",
    href: "",
  },
];
const EditProductPage = ({ params }) => {
  const { data: currCategory } = useFetch(
    "/api/category?size=10000&&deleteType=SD"
  );
  const [categoryOptions, setCategoryOptions] = useState([]);
  useEffect(() => {
    if (currCategory && currCategory.success) {
      const data = currCategory.data;
      const options = data.map((category) => ({
        label: category.fullName,
        value: category._id,
      }));
      setCategoryOptions(options);
    }
  }, [currCategory]);
  const formSchema = zSchema.pick({
    _id: true,
    fullName: true,
    slug: true,
    category: true,
    description: true,
    maximumRetailPrice: true,
    sellingPrice: true,
    discountPercentage: true,
  });
  const { id } = use(params);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: id,
      fullName: "",
      slug: "",
      category: "",
      description: "",
      maximumRetailPrice: 0,
      sellingPrice: 0,
      discountPercentage: 0,
    },
  });
  const { data: currProduct, loading: isProductLoading } = useFetch(
    `/api/product/get/${id}`
  );
  useEffect(() => {
    if (currProduct && currProduct.success) {
      const product = currProduct.data;
      form.reset({
        _id: product?._id,
        fullName: product?.fullName,
        slug: product?.slug,
        category: product?.category,
        description: product?.description,
        maximumRetailPrice: product?.maximumRetailPrice,
        sellingPrice: product?.sellingPrice,
        discountPercentage: product?.discountPercentage,
      });
      if (product.media) {
        const media = product.media.map((currMedia) => ({
          _id: currMedia._id,
          url: currMedia.secure_url,
        }));
        setSelectedMedia(media);
      }
    }
  }, [currProduct]);
  useEffect(() => {
    const fullName = form.getValues("fullName");
    if (fullName) {
      form.setValue("slug", slugify(fullName).toLowerCase());
    }
  }, [form.watch("fullName")]);
  useEffect(() => {
    const mrp = form.getValues("maximumRetailPrice") || 0;
    const sp = form.getValues("sellingPrice") || 0;
    let dp = 0;
    if (sp > 0 && mrp >= sp) {
      dp = ((mrp - sp) / mrp) * 100;
    }
    form.setValue("discountPercentage", Math.round(dp));
  }, [form.watch("maximumRetailPrice"), form.watch("sellingPrice")]);
  const editor = (event, editor) => {
    const data = editor.getData();
    form.setValue("description", data);
  };
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const onEditProductFormSubmit = async (values) => {
    setLoading(true);
    try {
      if (selectedMedia.length <= 0) {
        return toastify("error", "Select, at least, one media");
      }
      const mediaIDs = selectedMedia.map((media) => media._id);
      values.media = mediaIDs;
      const { data: response } = await axios.put("/api/product/edit", values);
      if (!response.success) {
        throw new Error(response.message);
      }
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
          <h2 className="uppercase text-xl font-semibold">Edit Product</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditProductFormSubmit)}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Slug<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Category<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            options={categoryOptions}
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
                <div className="my-2 md:col-span-2">
                  <FormLabel className="mb-2">
                    Description<span className="text-red-500">*</span>
                  </FormLabel>
                  {!isProductLoading && (
                    <Editor
                      initialData={form.getValues("description")}
                      onChange={editor}
                    />
                  )}
                  <FormMessage></FormMessage>
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
                  text="Save"
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

export default EditProductPage;
