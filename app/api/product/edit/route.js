import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";
import { encode } from "entities";

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
      fullName: true,
      slug: true,
      category: true,
      description: true,
      maximumRetailPrice: true,
      sellingPrice: true,
      discountPercentage: true,
    });
    const validateData = formSchema.safeParse(payload);
    if (!validateData.success) {
      return response(false, 401, "Invalid data", validateData.error);
    }
    const productData = validateData.data;
    const currProduct = await ProductModel.findOne({
      _id: productData._id,
      deletedAt: null,
    });
    if (!currProduct) {
      return response(false, 404, "Product not found");
    }
    currProduct.media = productData.media;
    currProduct.fullName = productData.fullName;
    currProduct.slug = productData.slug;
    currProduct.category = productData.category;
    currProduct.description = encode(productData.description);
    currProduct.maximumRetailPrice = productData.maximumRetailPrice;
    currProduct.sellingPrice = productData.sellingPrice;
    currProduct.discountPercentage = productData.discountPercentage;
    await currProduct.save();
    return response(true, 214, "Product edited");
  } catch (error) {
    return errorResponse(error);
  }
}
