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
    const filter = {
      deletedAt: null,
    };
    const currReview = await ReviewModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();
    if (!currReview) {
      return response(false, 404, "Review not found");
    }
    return response(true, 215, "Review found", currReview);
  } catch (error) {
    return errorResponse(error);
  }
}
