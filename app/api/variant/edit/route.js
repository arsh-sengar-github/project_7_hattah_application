import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import VariantModel from "@/models/variant.model";

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
    const variantData = validateData.data;
    const currVariant = await VariantModel.findOne({
      _id: variantData._id,
      deletedAt: null,
    });
    if (!currVariant) {
      return response(false, 404, "Variant not found");
    }
    currVariant.media = variantData.media;
    currVariant.product = variantData.product;
    currVariant.color = variantData.color;
    currVariant.size = variantData.size;
    currVariant.maximumRetailPrice = variantData.maximumRetailPrice;
    currVariant.sellingPrice = variantData.sellingPrice;
    currVariant.discountPercentage = variantData.discountPercentage;
    currVariant.stockKeepingUnit = variantData.stockKeepingUnit;
    await currVariant.save();
    return response(true, 214, "Variant edited");
  } catch (error) {
    return errorResponse(error);
  }
}
