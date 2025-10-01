import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import ProductModel from "@/models/product.model";

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
    const currProduct = await ProductModel.find(filter)
      .select("-media -description")
      .sort({ createdAt: -1 })
      .lean();
    if (!currProduct) {
      return response(false, 404, "Product not found");
    }
    return response(true, 211, "Product found", currProduct);
  } catch (error) {
    return errorResponse(error);
  }
}
