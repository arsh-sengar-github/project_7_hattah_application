import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import UserModel from "@/models/user.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("user");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    const userID = auth.userID;
    await connectDatabase();
    const user = await UserModel.findById(userID).lean();
    return response(true, 204, "User found", user);
  } catch (error) {
    return errorResponse(error);
  }
}
