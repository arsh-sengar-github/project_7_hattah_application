import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import ReviewModel from "@/models/review.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const searchParams = request.nextUrl.searchParams;
    const start = parseInt(searchParams.get("start") || 0, 10);
    const size = parseInt(searchParams.get("size") || 20, 10);
    const globalFilter = searchParams.get("globalFilter") || "";
    const filters = JSON.parse(searchParams.get("filters") || "[]");
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const deleteType = searchParams.get("deleteType");
    let matchQuery = {};
    if (globalFilter) {
      matchQuery["or"] = [
        { "productData.fullName": { $regex: globalFilter, $options: "i" } },
        { "userData.fullName": { $regex: globalFilter, $options: "i" } },
        { title: { $regex: globalFilter, $options: "i" } },
        { rating: { $regex: globalFilter, $options: "i" } },
        { review: { $regex: globalFilter, $options: "i" } },
      ];
    }
    filters.forEach((filter) => {
      if (filter.id === "product") {
        matchQuery["productData.fullName"] = {
          $regex: filter.value,
          $options: "i",
        };
      } else if (filter.id === "user") {
        matchQuery["userData.fullName"] = {
          $regex: filter.value,
          $options: "i",
        };
      } else {
        matchQuery[filter.id] = { $regex: filter.value, $options: "i" };
      }
    });
    if (deleteType === "SD") {
      matchQuery = {
        deletedAt: null,
      };
    } else if (deleteType === "PD") {
      matchQuery = {
        deletedAt: { $ne: null },
      };
    }
    let sortQuery = {};
    sorting.forEach((sort) => {
      sortQuery[sort.id] = sort.desc ? -1 : 1;
    });
    const aggregatePipeline = [
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: {
          path: "$productData",
          preserveNullAndEmptyArrays: true,
        },
      },
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
      { $skip: start },
      { $limit: size },
      { $match: matchQuery },
      { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
      {
        $project: {
          _id: 1,
          product: "$productData.fullName",
          user: "$userData.fullName",
          title: 1,
          rating: 1,
          review: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];
    const currReview = await ReviewModel.aggregate(aggregatePipeline);
    const currRowCount = await ReviewModel.countDocuments(matchQuery);
    return NextResponse.json({
      success: true,
      data: currReview,
      meta: { currRowCount },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
