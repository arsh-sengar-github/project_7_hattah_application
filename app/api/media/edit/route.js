import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import { isValidObjectId } from "mongoose";
import MediaModel from "@/models/media.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const payload = await request.json();
    const formSchema = zSchema.pick({
      _id: true,
      alt: true,
      title: true,
    });
    const validateData = formSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { _id, alt, title } = validateData.data;
    if (!isValidObjectId(_id)) {
      return response(false, 411, "Invalid media");
    }
    const currMedia = await MediaModel.findById(_id);
    if (!currMedia) {
      return response(false, 404, "Media not found");
    }
    currMedia.alt = alt;
    currMedia.title = title;
    await currMedia.save();
    return response(true, 212, "Media edited");
  } catch (error) {
    return errorResponse(error);
  }
}
