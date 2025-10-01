import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import ProductModel from "@/models/product.model";
import MediaModel from "@/models/media.model";

export async function GET(request) {
  try {
    await connectDatabase();
    const currProduct = await ProductModel.find({ deletedAt: null })
      .populate("media")
      .limit(8)
      .lean();
    if (!currProduct) {
      return response(false, 404, "Product not found");
    }
    return response(true, 211, "Product found", currProduct);
  } catch (error) {
    return errorResponse(error);
  }
}
