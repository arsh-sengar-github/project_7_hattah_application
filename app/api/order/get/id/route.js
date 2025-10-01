import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import { response, errorResponse } from "@/lib/helpers";
import Razorpay from "razorpay";

export async function POST(request) {
  try {
    await connectDatabase();
    const payload = await request.json();
    const orderSchema = zSchema.pick({
      amount: true,
    });
    const validateData = orderSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { amount } = validateData.data;
    const razorpayInstance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const razorpayOptions = {
      amount: Number(amount) * 100,
      currency: "INR",
    };
    const orderDetails = await razorpayInstance.orders.create(razorpayOptions);
    const order_id = orderDetails.id;
    return response(true, 219, "Order-ID generated", order_id);
  } catch (error) {
    return errorResponse(error);
  }
}
