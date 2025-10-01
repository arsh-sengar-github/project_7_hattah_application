import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import VariantModel from "@/models/variant.model";
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
        { color: { $regex: globalFilter, $options: "i" } },
        { size: { $regex: globalFilter, $options: "i" } },
        { "productData.fullName": { $regex: globalFilter, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$maximumRetailPrice" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$sellingPrice" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$discountPercentage" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
        { stockKeepingUnit: { $regex: globalFilter, $options: "i" } },
      ];
    }
    filters.forEach((filter) => {
      if (
        filter.id === "maximumRetailPrice" ||
        filter.id === "sellingPrice" ||
        filter.id === "discountPercentage"
      ) {
        matchQuery[filter.id] = Number(filter.value);
      } else if (filter.id === "product") {
        matchQuery["productData.fullName"] = {
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
      { $skip: start },
      { $limit: size },
      { $match: matchQuery },
      { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
      {
        $project: {
          _id: 1,
          product: "$productData.fullName",
          color: 1,
          size: 1,
          maximumRetailPrice: 1,
          sellingPrice: 1,
          discountPercentage: 1,
          stockKeepingUnit: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];
    const currVariant = await VariantModel.aggregate(aggregatePipeline);
    const currRowCount = await VariantModel.countDocuments(matchQuery);
    return NextResponse.json({
      success: true,
      data: currVariant,
      meta: { currRowCount },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
