"use client";
import { zSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { toastify } from "@/lib/toastify";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import { ADMIN_DASHBOARD } from "@/routes/AdminRoute";
import {
  USER_DASHBOARD,
  USER_REGISTER,
  USER_RESET_PASSWORD,
} from "@/routes/UserRoute";
import { login } from "@/store/reducer/authReducer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Logo from "@/public/assets/icons/logo.png";
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
import Link from "next/link";
import OTPVerification from "@/components/custom/otpVerification";

const LoginPage = () => {
  const formSchema = zSchema
    .pick({
      emailAddress: true,
    })
    .extend({
      password: z
        .string()
        .min(8, {
          message: "Password must be at least 8 characters long",
        })
        .max(64, {
          message: "Password must be at most 64 characters long",
        }),
    });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [otpEmailAddress, setOTPEmailAddress] = useState();
  const onLoginFormSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: loginResponse } = await axios.post(
        "/api/auth/login",
        values
      );
      if (!loginResponse.success) {
        throw new Error(loginResponse.message);
      }
      setOTPEmailAddress(values.emailAddress);
      form.reset();
      toastify("success", loginResponse.message);
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setLoading(false);
    }
  };
  const [otpLoading, setOTPLoading] = useState(false);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const onOTPVerificationFormSubmit = async (values) => {
    try {
      setOTPLoading(true);
      const { data: otpVerificationResponse } = await axios.post(
        "/api/auth/verify-otp",
        values
      );
      if (!otpVerificationResponse.success) {
        throw new Error(otpVerificationResponse.message);
      }
      setOTPEmailAddress("");
      toastify("success", otpVerificationResponse.message);
      dispatch(login(otpVerificationResponse.data));
      if (searchParams.has("callback")) {
        router.push(searchParams.get("callback"));
      } else {
        otpVerificationResponse.data.role === "admin"
          ? router.push(ADMIN_DASHBOARD)
          : router.push(USER_DASHBOARD);
      }
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setOTPLoading(false);
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div>
      <Card className="w-[400px]">
        <CardContent>
          <div className="flex justify-center">
            <Image
              className="max-w-[100px]"
              src={Logo.src}
              alt="Logo"
              width={Logo.width}
              height={Logo.height}
            />
          </div>
          {!otpEmailAddress ? (
            <div>
              <div className="my-2 text-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p>Log into your account, by filling out the form, below.</p>
              </div>
              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onLoginFormSubmit)}>
                    <div className="my-2">
                      <FormField
                        control={form.control}
                        name="emailAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="email.id@server.domain"
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
                              onClick={() =>
                                setPasswordVisible(!passwordVisible)
                              }
                            >
                              {passwordVisible ? (
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
                        text="Login"
                        loading={loading}
                        type="submit"
                      />
                    </div>
                    <div className="text-center">
                      <div className="my-2 flex justify-center items-center gap-1">
                        <p>Don't have an account?</p>
                        <Link
                          className="text-primary underline"
                          href={USER_REGISTER}
                        >
                          Create an account!
                        </Link>
                      </div>
                      <div>
                        <Link
                          className="text-primary underline"
                          href={USER_RESET_PASSWORD}
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          ) : (
            <div>
              <OTPVerification
                emailAddress={otpEmailAddress}
                loading={otpLoading}
                onSubmit={onOTPVerificationFormSubmit}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
