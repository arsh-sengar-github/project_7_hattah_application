import { isAuthenticated } from "@/lib/authenticate";
import { response, errorResponse } from "@/lib/helpers";
import { connectDatabase } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";
import { encode } from "entities";

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
    const {
      media,
      fullName,
      slug,
      category,
      description,
      maximumRetailPrice,
      sellingPrice,
      discountPercentage,
    } = validateData.data;
    const newProduct = new ProductModel({
      media,
      fullName,
      slug,
      category,
      description: encode(description),
      maximumRetailPrice,
      sellingPrice,
      discountPercentage,
    });
    await newProduct.save();
    return response(true, 213, "Product added");
  } catch (error) {
    return errorResponse(error);
  }
}
