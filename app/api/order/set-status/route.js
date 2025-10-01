import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import OrderModel from "@/models/order.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const { _id, status } = await request.json();
    if (!_id) {
      return response(false, 404, "Order-ID not found");
    }
    if (!status) {
      return response(false, 404, "Status not found");
    }
    const orderData = await OrderModel.findById(_id);
    if (!orderData) {
      return response(false, 404, "Order not found");
    }
    orderData.status = status;
    await orderData.save();
    return response(true, 205, "Status set", orderData);
  } catch (error) {
    return errorResponse(error);
  }
}
