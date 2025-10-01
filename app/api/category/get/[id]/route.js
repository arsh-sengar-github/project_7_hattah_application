import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { isValidObjectId } from "mongoose";
import CategoryModel from "@/models/category.model";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const currParams = await params;
    const id = currParams.id;
    if (!isValidObjectId(id)) {
      return response(false, 411, "Invalid media");
    }
    const filter = {
      deletedAt: null,
    };
    filter._id = id;
    const currCategory = await CategoryModel.findOne(filter).lean();
    if (!currCategory) {
      return response(false, 404, "Category not found");
    }
    return response(true, 211, "Category found", currCategory);
  } catch (error) {
    return errorResponse(error);
  }
}
