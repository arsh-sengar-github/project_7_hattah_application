import { isAuthenticated } from "@/lib/authenticate";
import { connectDatabase } from "@/lib/databaseConnection";
import { response, errorResponse } from "@/lib/helpers";
import OrderModel from "@/models/order.model";
import MediaModel from "@/models/media.model";
import ProductModel from "@/models/product.model";
import VariantModel from "@/models/variant.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("user");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    const userID = auth.userID;
    await connectDatabase();
    const orderCount = await OrderModel.countDocuments({ user: userID });
    const recentOrders = await OrderModel.find({ user: userID })
      .populate("products.productID", "fullName slug")
      .populate({
        path: "products.variantID",
        populate: {
          path: "media",
        },
      })
      .limit(20)
      .lean();
    return response(true, 221, "Dashboard data fetched", {
      orderCount,
      recentOrders,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
