import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import { response, errorResponse } from "@/lib/helpers";
import OTPModel from "@/models/otp.model";
import UserModel from "@/models/user.model";

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
    await otpData.deleteOne();
    return response(true, 204, "User found");
  } catch (error) {
    return errorResponse(error);
  }
}
