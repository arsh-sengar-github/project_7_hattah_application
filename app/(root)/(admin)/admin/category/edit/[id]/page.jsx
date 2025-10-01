"use client";
import { ADMIN_DASHBOARD, ADMIN_CATEGORY } from "@/routes/AdminRoute";
import { use, useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import BreadCrumb from "@/components/custom/admin/breadCrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import axios from "axios";
import { toastify } from "@/lib/toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/custom/buttonLoading";

const breadCrumbData = [
  {
    label: "Dashboard",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Category",
    href: ADMIN_CATEGORY,
  },
  {
    label: "Edit Category",
    href: "",
  },
];
const EditCategoryPage = ({ params }) => {
  const { id } = use(params);
  const { data: categoryData } = useFetch(`/api/category/get/${id}`);
  const formSchema = zSchema.pick({
    _id: true,
    fullName: true,
    slug: true,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: id,
      fullName: "",
      slug: "",
    },
  });
  useEffect(() => {
    if (categoryData && categoryData.success) {
      const data = categoryData.data;
      form.reset({
        _id: data?._id,
        fullName: data?.fullName,
        slug: data?.slug,
      });
    }
  }, [categoryData]);
  useEffect(() => {
    const fullName = form.getValues("fullName");
    if (fullName) {
      form.setValue("slug", slugify(fullName).toLowerCase());
    }
  }, [form.watch("fullName")]);
  const [loading, setLoading] = useState(false);
  const onAddCategoryFormSubmit = async (values) => {
    setLoading(true);
    try {
      const { data: response } = await axios.put("/api/category/edit", values);
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
          <h2 className="uppercase text-xl font-semibold">Edit Category</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAddCategoryFormSubmit)}>
              <div className="my-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
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
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

export default EditCategoryPage;
