import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import { response, errorResponse } from "@/lib/helpers";
import UserModel from "@/models/user.model";

export async function PUT(request) {
  try {
    await connectDatabase();
    const payload = await request.json();
    const validationSchema = zSchema.pick({
      emailAddress: true,
      password: true,
    });
    const validateData = validationSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { emailAddress, password } = validateData.data;
    const user = await UserModel.findOne({
      emailAddress,
      deletedAt: null,
    }).select("+password");
    if (!user) {
      return response(false, 404, "User not found");
    }
    user.password = password;
    await user.save();
    return response(true, 205, "Password set");
  } catch (error) {
    return errorResponse(error);
  }
}
