import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import CategoryModel from "@/models/category.model";
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
        { fullName: { $regex: globalFilter, $options: "i" } },
        { slug: { $regex: globalFilter, $options: "i" } },
      ];
    }
    filters.forEach((filter) => {
      matchQuery[filter.id] = { $regex: filter.value, $options: "i" };
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
          fullName: 1,
          slug: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];
    const currCategory = await CategoryModel.aggregate(aggregatePipeline);
    const currRowCount = await CategoryModel.countDocuments(matchQuery);
    return NextResponse.json({
      success: true,
      data: currCategory,
      meta: { currRowCount },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
