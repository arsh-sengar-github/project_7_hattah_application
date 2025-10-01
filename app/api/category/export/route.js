import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import CategoryModel from "@/models/category.model";

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
    const currCategory = await CategoryModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();
    if (!currCategory) {
      return response(false, 404, "Category not found");
    }
    return response(true, 215, "Category found", currCategory);
  } catch (error) {
    return errorResponse(error);
  }
}
