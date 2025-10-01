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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import ButtonLoading from "@/components/custom/buttonLoading";

const OTPVerification = ({ emailAddress, loading, onSubmit }) => {
  const formSchema = zSchema.pick({
    emailAddress: true,
    otp: true,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: emailAddress,
      otp: "",
    },
  });
  const onOTPVerificationFormSubmit = async (values) => {
    onSubmit(values);
  };
  const [resendOTPLoading, setResendOTPLoading] = useState(false);
  const onResendOTP = async () => {
    try {
      setResendOTPLoading(true);
      const { data: resendOTPResponse } = await axios.post(
        "/api/auth/resend-otp",
        {
          emailAddress,
        }
      );
      if (!resendOTPResponse.success) {
        throw new Error(resendOTPResponse.message);
      }
      toastify("success", resendOTPResponse.message);
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setResendOTPLoading(false);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onOTPVerificationFormSubmit)}>
          <div className="my-2 text-center">
            <h1 className="text-2xl font-bold">Verify</h1>
            <p>Verify yourself, by filling out the field, below.</p>
          </div>
          <div className="my-2">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password(OTP)</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
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
              loading={loading}
              type="submit"
            />
            <div className="my-2 text-center">
              {!resendOTPLoading ? (
                <button
                  className="text-orange-500 cursor-pointer hover:underline"
                  type="button"
                  onClick={onResendOTP}
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-yellow-500">Resending OTP...</span>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTPVerification;
