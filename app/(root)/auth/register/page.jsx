"use client";
import { zSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { toastify } from "@/lib/toastify";
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
import { USER_LOGIN } from "@/routes/UserRoute";

const RegisterPage = () => {
  const formSchema = zSchema
    .pick({
      fullName: true,
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
      fullName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const onRegisterFormSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: registrationResponse } = await axios.post(
        "/api/auth/register",
        values
      );
      if (!registrationResponse.success) {
        throw new Error(registrationResponse.message);
      }
      form.reset();
      toastify("success", registrationResponse.message);
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
      <Card className="w-[400px]">
        <CardContent>
          <div className="my-2 flex justify-center">
            <Image
              className="max-w-[100px]"
              src={Logo.src}
              alt="Logo"
              width={Logo.width}
              height={Logo.height}
            />
          </div>
          <div className="my-2 text-center">
            <h1 className="text-2xl font-bold">Register</h1>
            <p>Create an account, by filling out the form, below.</p>
          </div>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onRegisterFormSubmit)}>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="First Middle Last Names"
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
                    text="Register"
                    loading={loading}
                    type="submit"
                  />
                </div>
                <div className="my-2 text-center">
                  <div className="flex justify-center items-center gap-1">
                    <p>Already have an account?</p>
                    <Link className="text-primary underline" href={USER_LOGIN}>
                      Log into your account!
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
