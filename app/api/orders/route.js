import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import OrderModel from "@/models/order.model";
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
        { payment_id: { $regex: globalFilter, $options: "i" } },
        { order_id: { $regex: globalFilter, $options: "i" } },
        { fullName: { $regex: globalFilter, $options: "i" } },
        { emailAddress: { $regex: globalFilter, $options: "i" } },
        { phoneNumber: { $regex: globalFilter, $options: "i" } },
        { country: { $regex: globalFilter, $options: "i" } },
        { state: { $regex: globalFilter, $options: "i" } },
        { city: { $regex: globalFilter, $options: "i" } },
        { landmark: { $regex: globalFilter, $options: "i" } },
        { road: { $regex: globalFilter, $options: "i" } },
        { house: { $regex: globalFilter, $options: "i" } },
        {
          personalIdentificationNumberCode: {
            $regex: globalFilter,
            $options: "i",
          },
        },
        { discount: { $regex: globalFilter, $options: "i" } },
        { amount: { $regex: globalFilter, $options: "i" } },
        { extraDiscount: { $regex: globalFilter, $options: "i" } },
        { payable: { $regex: globalFilter, $options: "i" } },
        { status: { $regex: globalFilter, $options: "i" } },
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
    ];
    const currOrders = await OrderModel.aggregate(aggregatePipeline);
    const currRowCount = await OrderModel.countDocuments(matchQuery);
    return NextResponse.json({
      success: true,
      data: currOrders,
      meta: { currRowCount },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
