import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import UserModel from "@/models/user.model";
import cloudinary from "@/lib/cloudinary";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("user");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    const userID = auth.userID;
    await connectDatabase();
    const user = await UserModel.findById(userID);
    if (!user) {
      return response(false, 404, "User not found");
    }
    const formData = await request.formData();
    const file = formData.get("file");
    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const base64File = `data:${file.type};base64,${Buffer.from(
        fileBuffer
      ).toString("base64")}`;
      const uploadFile = await cloudinary.uploader.upload(base64File, {
        upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        folder: `hattah/${userID}/profile`,
      });
      if (user.avatar?.public_id) {
        await cloudinary.api.delete_resources([user.avatar.public_id]);
      }
      user.avatar = {
        url: uploadFile.secure_url,
        public_id: uploadFile.public_id,
      };
    }
    user.fullName = formData.get("fullName");
    user.phoneNumber = formData.get("phoneNumber");
    user.address = formData.get("address");
    await user.save();
    return response(true, 205, "User set", {
      _id: user._id.toString(),
      role: user.role,
      avatar: user.avatar,
      fullName: user.fullName,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
