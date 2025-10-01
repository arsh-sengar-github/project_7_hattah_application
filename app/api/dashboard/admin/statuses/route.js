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
    const statuses = await OrderModel.aggregate([
      {
        $match: {
          deletedAt: null,
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: 1,
        },
      },
    ]);
    return response(true, 215, "Dashboard statuses fetched", statuses);
  } catch (error) {
    return errorResponse(error);
  }
}
