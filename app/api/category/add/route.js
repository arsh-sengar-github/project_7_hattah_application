import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import CategoryModel from "@/models/category.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const payload = await request.json();
    const formSchema = zSchema.pick({
      fullName: true,
      slug: true,
    });
    const validateData = formSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { fullName, slug } = validateData.data;
    const newCategory = new CategoryModel({
      fullName,
      slug,
    });
    await newCategory.save();
    return response(true, 213, "Category added");
  } catch (error) {
    return errorResponse(error);
  }
}
