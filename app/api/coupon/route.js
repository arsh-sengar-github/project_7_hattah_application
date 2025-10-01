import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import CouponModel from "@/models/coupon.model";
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
        { code: { $regex: globalFilter, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$discountPercentage" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$minimumPurchaseAmount" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
      ];
    }
    filters.forEach((filter) => {
      if (
        filter.id === "discountPercentage" ||
        filter.id === "minimumPurchaseAmount"
      ) {
        matchQuery[filter.id] = Number(filter.value);
      } else if (filter.id === "validity") {
        matchQuery[filter.id] = new Date(filter.value);
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
      { $skip: start },
      { $limit: size },
      { $match: matchQuery },
      { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
      {
        $project: {
          _id: 1,
          code: 1,
          discountPercentage: 1,
          minimumPurchaseAmount: 1,
          validity: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];
    const currCoupon = await CouponModel.aggregate(aggregatePipeline);
    const currRowCount = await CouponModel.countDocuments(matchQuery);
    return NextResponse.json({
      success: true,
      data: currCoupon,
      meta: { currRowCount },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
