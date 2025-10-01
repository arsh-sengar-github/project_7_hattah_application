import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import UserModel from "@/models/user.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const filter = {
      deletedAt: null,
    };
    const currUser = await UserModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();
    if (!currUser) {
      return response(false, 404, "User not found");
    }
    return response(true, 204, "User found", currUser);
  } catch (error) {
    return errorResponse(error);
  }
}
