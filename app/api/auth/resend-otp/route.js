import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import { response, errorResponse, generateOTP } from "@/lib/helpers";
import UserModel from "@/models/user.model";
import OTPModel from "@/models/otp.model";
import { Mail } from "@/lib/mail";
import { otpVerification } from "@/mail/otpVerification";

export async function POST(request) {
  try {
    await connectDatabase();
    const payload = await request.json();
    const validationSchema = zSchema.pick({
      emailAddress: true,
    });
    const validateData = validationSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { emailAddress } = validateData.data;
    const user = await UserModel.findOne({ emailAddress });
    if (!user) {
      return response(false, 404, "User not found");
    }
    await OTPModel.deleteMany({ emailAddress });
    const newOTP = generateOTP();
    const newOTPData = new OTPModel({
      emailAddress,
      otp: newOTP,
    });
    await newOTPData.save();
    const newOTPStatus = await Mail(
      emailAddress,
      "Verify yourself, using your OTP, to log into Hattah",
      otpVerification(newOTP)
    );
    if (!newOTPStatus.success) {
      return response(false, 408, "Trouble sending OTP, please try again");
    }
    return response(true, 202, "OTP sent to your email address");
  } catch (error) {
    return errorResponse(error);
  }
}
