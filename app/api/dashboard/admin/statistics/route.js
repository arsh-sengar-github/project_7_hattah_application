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
    const statistics = await OrderModel.aggregate([
      {
        $match: {
          status: {
            $in: ["processing", "shipped", "delivered"],
          },
          deletedAt: null,
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          sales: {
            $sum: "$payable",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    return response(true, 215, "Dashboard statistics fetched", statistics);
  } catch (error) {
    return errorResponse(error);
  }
}
