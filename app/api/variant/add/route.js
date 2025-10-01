import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import VariantModel from "@/models/variant.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 410, "Unauthorized user");
    }
    await connectDatabase();
    const payload = await request.json();
    const formSchema = zSchema.pick({
      media: true,
      product: true,
      color: true,
      size: true,
      maximumRetailPrice: true,
      sellingPrice: true,
      discountPercentage: true,
      stockKeepingUnit: true,
    });
    const validateData = formSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const {
      media,
      product,
      color,
      size,
      maximumRetailPrice,
      sellingPrice,
      discountPercentage,
      stockKeepingUnit,
    } = validateData.data;
    const newVariant = new VariantModel({
      media,
      product,
      color,
      size,
      maximumRetailPrice,
      sellingPrice,
      discountPercentage,
      stockKeepingUnit,
    });
    await newVariant.save();
    return response(true, 213, "Variant added");
  } catch (error) {
    return errorResponse(error);
  }
}
