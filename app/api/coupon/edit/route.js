import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import CouponModel from "@/models/coupon.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const payload = await request.json();
    const formSchema = zSchema.pick({
      _id: true,
      code: true,
      discountPercentage: true,
      minimumPurchaseAmount: true,
      validity: true,
    });
    const validateData = formSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const couponData = validateData.data;
    const currCoupon = await CouponModel.findOne({
      _id: couponData._id,
      deletedAt: null,
    });
    if (!currCoupon) {
      return response(false, 404, "Coupon not found");
    }
    currCoupon.code = couponData.code;
    currCoupon.discountPercentage = couponData.discountPercentage;
    currCoupon.minimumPurchaseAmount = couponData.minimumPurchaseAmount;
    currCoupon.validity = couponData.validity;
    await currCoupon.save();
    return response(true, 214, "Coupon edited");
  } catch (error) {
    return errorResponse(error);
  }
}
