"use client";
import { zSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { toastify } from "@/lib/toastify";
import { useRouter } from "next/navigation";
import { USER_LOGIN } from "@/routes/UserRoute";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import ButtonLoading from "@/components/custom/buttonLoading";

const SetPassword = ({ emailAddress }) => {
  const formSchema = zSchema
    .pick({
      emailAddress: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: emailAddress,
      password: "",
      confirmPassword: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSetPasswordFormSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: setPasswordResponse } = await axios.put(
        "/api/auth/reset-password/set-password",
        values
      );
      if (!setPasswordResponse.success) {
        throw new Error(setPasswordResponse.message);
      }
      form.reset();
      toastify("success", setPasswordResponse.message);
      router.push(USER_LOGIN);
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setLoading(false);
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  return (
    <div>
      <div>
        <div className="my-2 text-center">
          <h1 className="text-2xl font-bold">Set Password</h1>
          <p>Set your password, by filling out the form, below.</p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSetPasswordFormSubmit)}>
              <div className="my-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={passwordVisible ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <button
                        className="absolute top-8 right-4 cursor-pointer"
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type={confirmPasswordVisible ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <button
                        className="absolute top-8 right-4 cursor-pointer"
                        type="button"
                        onClick={() =>
                          setConfirmPasswordVisible(!confirmPasswordVisible)
                        }
                      >
                        {confirmPasswordVisible ? (
                          <FaRegEye />
                        ) : (
                          <FaRegEyeSlash />
                        )}
                      </button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-2">
                <ButtonLoading
                  className="w-full cursor-pointer"
                  text="Set Password"
                  loading={loading}
                  type="submit"
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
