import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import CouponModel from "@/models/coupon.model";

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
    const currCoupon = await CouponModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();
    if (!currCoupon) {
      return response(false, 404, "Coupon not found");
    }
    return response(true, 215, "Coupon found", currCoupon);
  } catch (error) {
    return errorResponse(error);
  }
}
