import { connectDatabase } from "@/lib/databaseConnection";
import { response, errorResponse } from "@/lib/helpers";
import UserModel from "@/models/user.model";
import { jwtVerify } from "jose";
import { isValidObjectId } from "mongoose";

export async function POST(request) {
  try {
    await connectDatabase();
    const { token } = await request.json();
    if (!token) {
      return response(false, 403, "Token is required");
    }
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const decodedToken = await jwtVerify(token, secret);
    const userID = decodedToken.payload.userID;
    if (!isValidObjectId(userID)) {
      return response(false, 405, "Invalid user");
    }
    const user = await UserModel.findById(userID);
    if (!user) {
      return response(false, 404, "User not found");
    }
    user.isVerified = true;
    await user.save();
    return response(true, 202, "User verified successfully");
  } catch (error) {
    return errorResponse(error);
  }
}
