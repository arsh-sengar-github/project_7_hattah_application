import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import MediaModel from "@/models/media.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page"), 10) || 0;
    const limit = parseInt(searchParams.get("limit"), 10) || 20;
    const deleteType = searchParams.get("deleteType");
    let filter = {};
    if (deleteType === "SD") {
      filter = {
        deletedAt: null,
      };
    } else if (deleteType === "PD") {
      filter = {
        deletedAt: { $ne: null },
      };
    }
    const mediaData = await MediaModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .lean();
    const mediaCount = await MediaModel.countDocuments(filter);
    return NextResponse.json({
      mediaData: mediaData,
      hasMore: (page + 1) * limit < mediaCount,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
