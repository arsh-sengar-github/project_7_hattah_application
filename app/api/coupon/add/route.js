import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import CouponModel from "@/models/coupon.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const payload = await request.json();
    const formSchema = zSchema.pick({
      code: true,
      discountPercentage: true,
      minimumPurchaseAmount: true,
      validity: true,
    });
    const validateData = formSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { code, discountPercentage, minimumPurchaseAmount, validity } =
      validateData.data;
    const newCoupon = new CouponModel({
      code,
      discountPercentage,
      minimumPurchaseAmount,
      validity,
    });
    await newCoupon.save();
    return response(true, 213, "Coupon added");
  } catch (error) {
    return errorResponse(error);
  }
}
