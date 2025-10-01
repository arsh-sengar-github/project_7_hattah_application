import { connectDatabase } from "@/lib/databaseConnection";
import VariantModel from "@/models/variant.model";
import { response, errorResponse } from "@/lib/helpers";

export async function POST(request) {
  try {
    await connectDatabase();
    const payload = await request.json();
    const verifiedData = await Promise.all(
      payload.map(async (inCartProduct) => {
        const variant = await VariantModel.findById(inCartProduct.variantID)
          .populate("product")
          .populate("media", "secure_url")
          .lean();
        if (variant) {
          return {
            productID: variant.product._id,
            variantID: variant._id,
            media: variant?.media[0]?.secure_url,
            fullName: variant.product.fullName,
            url: variant.product.slug,
            color: variant.color,
            size: variant.size,
            maximumRetailPrice: variant.maximumRetailPrice,
            sellingPrice: variant.sellingPrice,
            quantity: inCartProduct.quantity,
          };
        }
      })
    );
    return response(true, 217, "Data verified", verifiedData);
  } catch (error) {
    return errorResponse(error);
  }
}
