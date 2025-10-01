import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { isValidObjectId } from "mongoose";
import ProductModel from "@/models/product.model";
import MediaModel from "@/models/media.model";

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
    const currProduct = await ProductModel.findOne(filter)
      .populate("media", "_id secure_url")
      .lean();
    if (!currProduct) {
      return response(false, 404, "Product not found");
    }
    return response(true, 211, "Product found", currProduct);
  } catch (error) {
    return errorResponse(error);
  }
}
