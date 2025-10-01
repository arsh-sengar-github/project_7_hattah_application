import { connectDatabase } from "@/lib/databaseConnection";
import mongoose from "mongoose";
import ReviewModel from "@/models/review.model";
import { response, errorResponse } from "@/lib/helpers";

export async function GET(request) {
  try {
    await connectDatabase();
    const searchParams = request.nextUrl.searchParams;
    const productID = searchParams.get("productID");
    const page = parseInt(searchParams.get("page")) || 0;
    const limit = 10;
    const skip = page * limit;
    let matchQuery = {
      product: new mongoose.Types.ObjectId(productID),
      deletedAt: null,
    };
    const aggregation = [
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: {
          path: "$userData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: matchQuery,
      },
      { $limit: limit + 1 },
      {
        $skip: skip,
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          _id: 1,
          avatar: "$userData.avatar",
          reviewedBy: "$userData.fullName",
          title: 1,
          rating: 1,
          review: 1,
          createdAt: 1,
        },
      },
    ];
    const reviews = await ReviewModel.aggregate(aggregation);
    const reviewCount = await ReviewModel.countDocuments(matchQuery);
    let nextPage = null;
    if (reviews.length > limit) {
      nextPage = page + 1;
      reviews.pop();
    }
    return response(true, 213, "Review added", {
      reviews,
      reviewCount,
      nextPage,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
