import { connectDatabase } from "@/lib/databaseConnection";
import { response, errorResponse } from "@/lib/helpers";
import ProductModel from "@/models/product.model";
import MediaModel from "@/models/media.model";
import VariantModel from "@/models/variant.model";
import ReviewModel from "@/models/review.model";

export async function GET(request, { params }) {
  try {
    await connectDatabase();
    const currParams = await params;
    const slug = currParams.slug;
    if (!slug) {
      return response(false, 401, "Invalid data");
    }
    const productFilter = {
      deletedAt: null,
    };
    productFilter.slug = slug;
    const currProduct = await ProductModel.findOne(productFilter)
      .populate("media", "secure_url")
      .lean();
    if (!currProduct) {
      return response(false, 404, "Product not found");
    }
    const variantFilter = {
      product: currProduct._id,
    };
    const searchParams = request.nextUrl.searchParams;
    const color = searchParams.get("color");
    if (color) {
      variantFilter.color = color;
    }
    const size = searchParams.get("size");
    if (size) {
      variantFilter.size = size;
    }
    const currVariant = await VariantModel.findOne(variantFilter)
      .populate("media", "secure_url")
      .lean();
    if (!currVariant) {
      return response(false, 404, "Variant not found");
    }
    const currColor = await VariantModel.aggregate([
      { $match: { product: currProduct._id } },
      { $sort: { _id: 1 } },
      {
        $group: {
          _id: "$color",
          first: {
            $first: "$_id",
          },
        },
      },
      { $sort: { first: 1 } },
      { $project: { _id: 0, color: "$_id" } },
    ]);
    const currSize = await VariantModel.aggregate([
      { $match: { product: currProduct._id } },
      { $sort: { _id: 1 } },
      {
        $group: {
          _id: "$size",
          first: {
            $first: "$_id",
          },
        },
      },
      { $sort: { first: 1 } },
      { $project: { _id: 0, size: "$_id" } },
    ]);
    const currReviewCount = await ReviewModel.countDocuments({
      product: currProduct._id,
    });
    const productData = {
      product: currProduct,
      variant: currVariant,
      colors: currColor.length ? currColor.map((item) => item.color) : [],
      sizes: currSize.length ? currSize.map((item) => item.size) : [],
      reviewCount: currReviewCount,
    };
    return response(true, 211, "Product found", productData);
  } catch (error) {
    return errorResponse(error);
  }
}
