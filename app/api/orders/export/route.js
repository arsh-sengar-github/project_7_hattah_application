import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import OrderModel from "@/models/order.model";

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
    const currOrders = await OrderModel.find(filter)
      .select("-products")
      .sort({ createdAt: -1 })
      .lean();
    if (!currOrders) {
      return response(false, 404, "Order not found");
    }
    return response(true, 215, "Order found", currOrders);
  } catch (error) {
    return errorResponse(error);
  }
}
