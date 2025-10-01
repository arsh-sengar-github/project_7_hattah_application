import { connectDatabase } from "@/lib/databaseConnection";
import { response, errorResponse } from "@/lib/helpers";
import z from "zod";
import { zSchema } from "@/lib/zodSchema";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import OrderModel from "@/models/order.model";
import { Mail } from "@/lib/mail";
import { orderNotification } from "@/mail/orderNotification";

export async function POST(request) {
  try {
    await connectDatabase();
    const payload = await request.json();
    const productSchema = z.object({
      productID: z.string().length(24, "Invalid Product-ID"),
      variantID: z.string().length(24, "Invalid Variant-ID"),
      fullName: z.string().min(1),
      maximumRetailPrice: z.number().nonnegative(),
      sellingPrice: z.number().nonnegative(),
      quantity: z.number().positive(),
    });
    const orderSchema = zSchema
      .pick({
        fullName: true,
        emailAddress: true,
        phoneNumber: true,
        country: true,
        state: true,
        city: true,
        landmark: true,
        road: true,
        house: true,
        personalIdentificationNumberCode: true,
        orderNote: true,
      })
      .extend({
        userID: z.string().optional(),
        razorpay_payment_id: z
          .string()
          .min(4, "Razorpay's Payment-ID must  be at least 4 characters long"),
        razorpay_order_id: z
          .string()
          .min(4, "Razorpay's Order-ID must  be at least 4 characters long"),
        razorpay_signature: z
          .string()
          .min(4, "Razorpay's Signature must  be at least 4 characters long"),
        products: z.array(productSchema),
        discount: z.number().nonnegative(),
        amount: z.number().nonnegative(),
        extraDiscount: z.number().nonnegative(),
        payable: z.number().nonnegative(),
      });
    const validateData = orderSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const responseData = validateData.data;
    const paymentVerification = validatePaymentVerification(
      {
        payment_id: responseData.razorpay_payment_id,
        order_id: responseData.razorpay_order_id,
      },
      responseData.razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET
    );
    let isPaymentVerified = false;
    if (paymentVerification) {
      isPaymentVerified = true;
    }
    const newOrder = await OrderModel.create({
      user: responseData.userID,
      fullName: responseData.fullName,
      emailAddress: responseData.emailAddress,
      phoneNumber: responseData.phoneNumber,
      country: responseData.country,
      state: responseData.state,
      city: responseData.city,
      landmark: responseData.landmark,
      road: responseData.road,
      house: responseData.house,
      personalIdentificationNumberCode:
        responseData.personalIdentificationNumberCode,
      orderNote: responseData.orderNote,
      products: responseData.products,
      discount: responseData.discount,
      amount: responseData.amount,
      extraDiscount: responseData.extraDiscount,
      payable: responseData.payable,
      payment_id: responseData.razorpay_payment_id,
      order_id: responseData.razorpay_order_id,
      status: isPaymentVerified ? "pending" : "unverified",
    });
    try {
      const mailData = {
        order_id: responseData.razorpay_order_id,
        orderDetailsURL: `${process.env.NEXT_PUBLIC_BASE_URL}/order/${responseData.razorpay_order_id}`,
      };
      await Mail(
        responseData.emailAddress,
        "Your order has been placed",
        orderNotification(mailData)
      );
    } catch (error) {
      return errorResponse(error);
    }
    return response(true, 220, "Order placed");
  } catch (error) {
    return errorResponse(error);
  }
}
