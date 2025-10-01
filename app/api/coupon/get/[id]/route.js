import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { isValidObjectId } from "mongoose";
import CouponModel from "@/models/coupon.model";

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
    const currCoupon = await CouponModel.findOne(filter).lean();
    if (!currCoupon) {
      return response(false, 404, "Coupon not found");
    }
    return response(true, 211, "Coupon found", currCoupon);
  } catch (error) {
    return errorResponse(error);
  }
}
