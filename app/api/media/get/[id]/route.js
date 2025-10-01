import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { isValidObjectId } from "mongoose";
import MediaModel from "@/models/media.model";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const currParams = await params;
    const id = currParams.id;
    if (!isValidObjectId(id)) {
      return response(false, 411, "Invalid media");
    }
    const filter = {
      deletedAt: null,
    };
    filter._id = id;
    const currMedia = await MediaModel.findOne(filter).lean();
    if (!currMedia) {
      return response(false, 404, "Media not found");
    }
    return response(true, 211, "Media found", currMedia);
  } catch (error) {
    return errorResponse(error);
  }
}
