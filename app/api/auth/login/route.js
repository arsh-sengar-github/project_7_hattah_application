import { connectDatabase } from "@/lib/databaseConnection";
import { response, errorResponse, generateOTP } from "@/lib/helpers";
import { zSchema } from "@/lib/zodSchema";
import z from "zod";
import UserModel from "@/models/user.model";
import { SignJWT } from "jose";
import { Mail } from "@/lib/mail";
import { mailVerification } from "@/mail/mailVerification";
import OTPModel from "@/models/otp.model";
import { otpVerification } from "@/mail/otpVerification";

export async function POST(request) {
  try {
    await connectDatabase();
    const payload = await request.json();
    const validationSchema = zSchema
      .pick({
        emailAddress: true,
      })
      .extend({
        password: z.string(),
      });
    const validateData = validationSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { emailAddress, password } = validateData.data;
    const user = await UserModel.findOne({
      emailAddress,
      deletedAt: null,
    }).select("+password");
    if (!user) {
      return response(false, 404, "User not found");
    }
    if (!user.isVerified) {
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      const token = await new SignJWT({
        userID: user._id.toString(),
      })
        .setIssuedAt()
        .setExpirationTime("2h")
        .setProtectedHeader({
          alg: "HS256",
        })
        .sign(secret);
      await Mail(
        emailAddress,
        "Verify your email address, to register for Hattah",
        mailVerification(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
        )
      );
      return response(false, 407, "Please verify your email address");
    }
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return response(false, 406, "Invalid password");
    }
    await OTPModel.deleteMany({ emailAddress });
    const otp = generateOTP();
    const otpData = new OTPModel({
      emailAddress,
      otp,
    });
    await otpData.save();
    const otpStatus = await Mail(
      emailAddress,
      "Verify yourself, using your OTP, to log into Hattah",
      otpVerification(otp)
    );
    if (!otpStatus.success) {
      return response(false, 408, "Trouble sending OTP, please try again");
    }
    return response(true, 202, "OTP sent to your email address");
  } catch (error) {
    return errorResponse(error);
  }
}
