import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import MediaModel from "@/models/media.model";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  const payload = await request.json();
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const newMedia = await MediaModel.insertMany(payload);
    return response(true, 207, "Media uploaded", newMedia);
  } catch (error) {
    if (payload && payload.length > 0) {
      const publicIDs = payload.map((data) => data.public_id);
      try {
        await cloudinary.api.delete_resources(publicIDs);
      } catch (deletionError) {
        error.cloudinary = deletionError;
      }
    }
    return errorResponse(error);
  }
}
