"use client";
import { zSchema } from "@/lib/zodSchema";
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
import ButtonLoading from "@/components/custom/buttonLoading";
import Link from "next/link";
import { USER_LOGIN } from "@/routes/UserRoute";
import OTPVerification from "@/components/custom/otpVerification";
import SetPassword from "@/components/custom/setPassword";

const ResetPassword = () => {
  const formSchema = zSchema.pick({
    emailAddress: true,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
    },
  });
  const [emailAddressLoading, setEmailAddressLoading] = useState(false);
  const [otpEmailAddress, setOTPEmailAddress] = useState();
  const onEmailAddressVerificationFormSubmit = async (values) => {
    try {
      setEmailAddressLoading(true);
      const { data: emailAddressVerificationResponse } = await axios.post(
        "/api/auth/reset-password/resend-otp",
        values
      );
      if (!emailAddressVerificationResponse.success) {
        throw new Error(emailAddressVerificationResponse.message);
      }
      setOTPEmailAddress(values.emailAddress);
      toastify("success", emailAddressVerificationResponse.message);
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setEmailAddressLoading(false);
    }
  };
  const [otpLoading, setOTPLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const onOTPVerificationFormSubmit = async (values) => {
    try {
      setOTPLoading(true);
      const { data: otpVerificationResponse } = await axios.post(
        "/api/auth/reset-password/verify-otp",
        values
      );
      if (!otpVerificationResponse.success) {
        throw new Error(otpVerificationResponse.message);
      }
      toastify("success", otpVerificationResponse.message);
      setIsVerified(true);
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setOTPLoading(false);
    }
  };
  return (
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
              <h1 className="text-2xl font-bold">Reset</h1>
              <p>Reset your password, by filling out the form, below.</p>
            </div>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(
                    onEmailAddressVerificationFormSubmit
                  )}
                >
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
                    <ButtonLoading
                      className="w-full cursor-pointer"
                      text="Verify"
                      loading={emailAddressLoading}
                      type="submit"
                    />
                  </div>
                  <div className="text-center">
                    <div className="my-2 flex justify-center items-center">
                      <Link
                        className="text-primary underline"
                        href={USER_LOGIN}
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        ) : (
          <div>
            {!isVerified ? (
              <OTPVerification
                emailAddress={otpEmailAddress}
                loading={otpLoading}
                onSubmit={onOTPVerificationFormSubmit}
              />
            ) : (
              <SetPassword emailAddress={otpEmailAddress} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
