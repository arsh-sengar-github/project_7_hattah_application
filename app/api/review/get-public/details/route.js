import { connectDatabase } from "@/lib/databaseConnection";
import { response, errorResponse } from "@/lib/helpers";
import ReviewModel from "@/models/review.model";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await connectDatabase();
    const searchParams = request.nextUrl.searchParams;
    const productID = searchParams.get("productID");
    if (!productID) {
      return response(false, 401, "Invalid data");
    }
    const reviews = await ReviewModel.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productID),
          deletedAt: null,
        },
      },
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
    ]);
    const reviewCount = reviews.reduce((sum, review) => sum + review.count, 0);
    const averageRating =
      reviewCount > 0
        ? (
            reviews.reduce(
              (sum, review) => sum + review._id * review.count,
              0
            ) / reviewCount
          ).toFixed(1)
        : 0;
    const individualProgress = reviews.reduce((accessor, review) => {
      accessor[review._id] =
        reviewCount > 0 ? (review.count / reviewCount) * 100 : 0;
      return accessor;
    }, {});
    const individualRatingCount = reviews.reduce((accessor, review) => {
      accessor[review._id] = review.count;
      return accessor;
    }, {});
    return response(true, 211, "Review found", {
      reviewCount,
      averageRating,
      individualProgress,
      individualRatingCount,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
