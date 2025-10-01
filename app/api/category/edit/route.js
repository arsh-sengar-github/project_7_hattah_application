import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import CategoryModel from "@/models/category.model";

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
      fullName: true,
      slug: true,
    });
    const validateData = formSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const { _id, fullName, slug } = validateData.data;
    const currCategory = await CategoryModel.findOne({
      _id,
      deletedAt: null,
    });
    if (!currCategory) {
      return response(false, 404, "Category not found");
    }
    currCategory.fullName = fullName;
    currCategory.slug = slug;
    await currCategory.save();
    return response(true, 214, "Category edited");
  } catch (error) {
    return errorResponse(error);
  }
}
