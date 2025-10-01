import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import { response, errorResponse } from "@/lib/helpers";
import CouponModel from "@/models/coupon.model";

export async function POST(request) {
  try {
    await connectDatabase();
    const payload = await request.json();
    const couponFormSchema = zSchema.pick({
      code: true,
      minimumPurchaseAmount: true,
    });
    const validateData = couponFormSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { code, minimumPurchaseAmount } = validateData.data;
    const couponData = await CouponModel.findOne({
      code,
      deletedAt: null,
    }).lean();
    if (!couponData) {
      return response(false, 404, "Coupon not found");
    }
    if (minimumPurchaseAmount < couponData.minimumPurchaseAmount) {
      return response(false, 412, "Coupon's minimum purchase amount not met");
    }
    if (new Date() > couponData.validity) {
      return response(false, 413, "Coupon expired");
    }
    return response(true, 218, "Coupon applied", {
      discountPercentage: couponData.discountPercentage,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
