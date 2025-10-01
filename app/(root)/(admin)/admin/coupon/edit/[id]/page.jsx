"use client";
import { ADMIN_COUPON, ADMIN_DASHBOARD } from "@/routes/AdminRoute";
import { use, useEffect, useState } from "react";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import dayjs from "dayjs";
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
import ButtonLoading from "@/components/custom/buttonLoading";

const breadCrumbData = [
  {
    label: "Dashboard",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Coupon",
    href: ADMIN_COUPON,
  },
  {
    label: "Edit Coupon",
    href: "",
  },
];
const EditCouponPage = ({ params }) => {
  const formSchema = zSchema.pick({
    _id: true,
    code: true,
    discountPercentage: true,
    minimumPurchaseAmount: true,
    validity: true,
  });
  const { id } = use(params);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: id,
      code: "",
      discountPercentage: 0,
      minimumPurchaseAmount: 0,
      validity: "",
    },
  });
  const { data: currCoupon } = useFetch(`/api/coupon/get/${id}`);
  useEffect(() => {
    if (currCoupon && currCoupon.success) {
      const coupon = currCoupon.data;
      form.reset({
        _id: coupon._id,
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
        minimumPurchaseAmount: coupon.minimumPurchaseAmount,
        validity: dayjs(coupon.validity).format("YYYY-MM-DD"),
      });
    }
  }, [currCoupon]);
  const [loading, setLoading] = useState(false);
  const onEditCouponFormSubmit = async (values) => {
    setLoading(true);
    try {
      const { data: response } = await axios.put("/api/coupon/edit", values);
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
          <h2 className="uppercase text-xl font-semibold">Edit Coupon</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditCouponFormSubmit)}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Code<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Code" {...field} />
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
                          <Input type="number" placeholder="10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="minimumPurchaseAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Minimum Purchase Amount
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
                    name="validity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Validity
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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

export default EditCouponPage;
