"use client";
import { ADMIN_DASHBOARD, ADMIN_MEDIA } from "@/routes/AdminRoute";
import { use, useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import BreadCrumb from "@/components/custom/admin/breadCrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import ImagePlaceholder from "@/public/assets/images/image-placeholder.webp";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/custom/buttonLoading";
import Image from "next/image";

const breadCrumbData = [
  {
    label: "Dashboard",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Media",
    href: ADMIN_MEDIA,
  },
  {
    label: "Edit Media",
    href: "",
  },
];
const EditMediaPage = ({ params }) => {
  const { id } = use(params);
  const { data: mediaData } = useFetch(`/api/media/get/${id}`);
  const formSchema = zSchema.pick({
    _id: true,
    alt: true,
    title: true,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
      alt: "",
      title: "",
    },
  });
  useEffect(() => {
    if (mediaData && mediaData.success) {
      const data = mediaData.data;
      form.reset({
        _id: data._id,
        alt: data.alt,
        title: data.title,
      });
    }
  }, [mediaData]);
  const [loading, setLoading] = useState(false);
  const onEditMediaFormSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: editMediaResponse } = await axios.put(
        "/api/media/edit",
        values
      );
      if (!editMediaResponse.success) {
        throw new Error(editMediaResponse.message);
      }
      toastify("success", editMediaResponse.message);
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
          <h2 className="uppercase text-xl font-semibold">Edit Media</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditMediaFormSubmit)}>
              <div className="my-2">
                <Image
                  src={mediaData?.data?.secure_url || ImagePlaceholder}
                  alt={mediaData?.alt || "image"}
                  width={200}
                  height={200}
                />
              </div>
              <div className="my-2">
                <FormField
                  control={form.control}
                  name="alt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alternate Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Alternate Name"
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Title" {...field} />
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

export default EditMediaPage;
