import { connectDatabase } from "@/lib/databaseConnection";
import { response, errorResponse } from "@/lib/helpers";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/user.model";
import { SignJWT } from "jose";
import { Mail } from "@/lib/mail";
import { mailVerification } from "@/mail/mailVerification";

export async function POST(request) {
  try {
    await connectDatabase();
    const payload = await request.json();
    const validationSchema = zSchema.pick({
      fullName: true,
      emailAddress: true,
      password: true,
    });
    const validateData = validationSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { fullName, emailAddress, password } = validateData.data;
    const registeredUser = await UserModel.exists({ emailAddress });
    if (registeredUser) {
      return response(true, 402, "Registered user");
    }
    const registration = new UserModel({
      fullName,
      emailAddress,
      password,
    });
    await registration.save();
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({
      userID: registration._id.toString(),
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
    return response(
      true,
      201,
      "Registration successful, please verify your email address"
    );
  } catch (error) {
    return errorResponse(error);
  }
}
