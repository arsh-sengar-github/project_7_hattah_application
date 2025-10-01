import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import { response, errorResponse } from "@/lib/helpers";
import OTPModel from "@/models/otp.model";
import UserModel from "@/models/user.model";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDatabase();
    const payload = await request.json();
    const validationSchema = zSchema.pick({
      emailAddress: true,
      otp: true,
    });
    const validateData = validationSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { emailAddress, otp } = validateData.data;
    const otpData = await OTPModel.findOne({ emailAddress, otp });
    if (!otpData) {
      return response(false, 409, "Invalid, or expired OTP");
    }
    const user = await UserModel.findOne({
      emailAddress,
      deletedAt: null,
    }).lean();
    if (!user) {
      return response(false, 404, "User not found");
    }
    const loggedInUserData = {
      _id: user._id.toString(),
      role: user.role,
      avatar: user.avatar,
      fullName: user.fullName,
    };
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT(loggedInUserData)
      .setIssuedAt()
      .setExpirationTime("24h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);
    const cookieStore = await cookies();
    cookieStore.set({
      name: "access_token",
      value: token,
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
    await otpData.deleteOne();
    return response(true, 203, "User logged in", loggedInUserData);
  } catch (error) {
    return errorResponse(error);
  }
}
