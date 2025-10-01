import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import CategoryModel from "@/models/category.model";

export async function GET(request) {
  try {
    await connectDatabase();
    const currCategory = await CategoryModel.find({ deletedAt: null }).lean();
    if (!currCategory) {
      return response(false, 404, "Category not found");
    }
    return response(true, 211, "Category found", currCategory);
  } catch (error) {
    return errorResponse(error);
  }
}
