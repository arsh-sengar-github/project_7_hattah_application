import { connectDatabase } from "@/lib/databaseConnection";
import { response, errorResponse } from "@/lib/helpers";
import OrderModel from "@/models/order.model";
import MediaModel from "@/models/media.model";
import ProductModel from "@/models/product.model";
import VariantModel from "@/models/variant.model";

export async function GET(request, { params }) {
  try {
    await connectDatabase();
    const currParams = await params;
    const orderid = currParams.orderid;
    if (!orderid) {
      return response(false, 404, "Order-ID not found");
    }
    const orderData = await OrderModel.findOne({ order_id: orderid })
      .populate("products.productID", "fullName slug")
      .populate({
        path: "products.variantID",
        populate: {
          path: "media",
        },
      })
      .lean();
    if (!orderData) {
      return response(false, 404, "Order not found");
    }
    return response(true, 215, "Order found", orderData);
  } catch (error) {
    return errorResponse(error);
  }
}
