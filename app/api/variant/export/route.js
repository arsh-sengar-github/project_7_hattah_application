import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import VariantModel from "@/models/variant.model";

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
    const currVariant = await VariantModel.find(filter)
      .select("-media")
      .sort({ createdAt: -1 })
      .lean();
    if (!currVariant) {
      return response(false, 404, "Variant not found");
    }
    return response(true, 215, "Variant found", currVariant);
  } catch (error) {
    return errorResponse(error);
  }
}
