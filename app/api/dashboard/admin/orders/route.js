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
    const orders = await OrderModel.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();
    return response(true, 215, "Dashboard orders fetched", orders);
  } catch (error) {
    return errorResponse(error);
  }
}
