import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import ReviewModel from "@/models/review.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const reviews = await ReviewModel.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .populate({
        path: "product",
        select: "media fullName",
        populate: {
          path: "media",
          select: "secure_url",
        },
      })
      .limit(20);
    return response(true, 215, "Dashboard reviews fetched", reviews);
  } catch (error) {
    return errorResponse(error);
  }
}
