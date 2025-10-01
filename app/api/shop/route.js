import { connectDatabase } from "@/lib/databaseConnection";
import CategoryModel from "@/models/category.model";
import ProductModel from "@/models/product.model";
import { response, errorResponse } from "@/lib/helpers";

export async function GET(request) {
  try {
    await connectDatabase();
    const searchParams = request.nextUrl.searchParams;
    let matchStage = {};
    const searchSlug = searchParams.get("search");
    if (searchSlug) {
      matchStage.fullName = { $regex: searchSlug, $options: "i" };
    }
    const categorySlug = searchParams.get("category");
    let categoryID = [];
    if (categorySlug) {
      const slugs = categorySlug.split(",");
      const categoryData = await CategoryModel.find({
        slug: { $in: slugs },
        deletedAt: null,
      })
        .select("_id")
        .lean();
      if (categoryData) {
        categoryID = categoryData.map((category) => category._id);
      }
    }
    if (categoryID.length > 0) {
      matchStage.category = { $in: categoryID };
    }
    const colorSlug = searchParams.get("color");
    const sizeSlug = searchParams.get("size");
    const minimumPriceSlug = parseInt(searchParams.get("minimumPrice")) || 0;
    const maximumPriceSlug = parseInt(searchParams.get("maximumPrice")) || 2000;
    const limitSlug = parseInt(searchParams.get("limit")) || 12;
    const pageSlug = parseInt(searchParams.get("page")) || 0;
    const skipSlug = limitSlug * pageSlug;
    const sortingSlug = searchParams.get("sorting") || "default";
    let sortingQuery = {};
    if (sortingSlug === "default") {
      sortingQuery = { createdAt: -1 };
    } else if (sortingSlug === "ascending") {
      sortingQuery = { fullName: 1 };
    } else if (sortingSlug === "descending") {
      sortingQuery = { fullName: -1 };
    } else if (sortingSlug === "increasing") {
      sortingQuery = { sellingPrice: 1 };
    } else {
      sortingQuery = { sellingPrice: -1 };
    }
    const products = await ProductModel.aggregate([
      {
        $lookup: {
          from: "medias",
          localField: "media",
          foreignField: "_id",
          as: "media",
        },
      },
      { $match: matchStage },
      {
        $lookup: {
          from: "variants",
          localField: "_id",
          foreignField: "product",
          as: "currVariants",
        },
      },
      {
        $addFields: {
          currVariants: {
            $filter: {
              input: "$currVariants",
              as: "currVariant",
              cond: {
                $and: [
                  colorSlug
                    ? { $in: ["$$currVariant.color", colorSlug.split(",")] }
                    : { $literal: true },
                  sizeSlug
                    ? { $in: ["$$currVariant.size", sizeSlug.split(",")] }
                    : { $literal: true },
                  { $gte: ["$$currVariant.sellingPrice", minimumPriceSlug] },
                  { $lte: ["$$currVariant.sellingPrice", maximumPriceSlug] },
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          currVariants: { $ne: [] },
        },
      },
      { $skip: skipSlug },
      { $limit: limitSlug + 1 },
      { $sort: sortingQuery },
      {
        $project: {
          _id: 1,
          media: {
            _id: 1,
            secure_url: 1,
            alt: 1,
          },
          fullName: 1,
          slug: 1,
          maximumRetailPrice: 1,
          sellingPrice: 1,
          discountPercentage: 1,
          currVariants: {
            color: 1,
            size: 1,
            maximumRetailPrice: 1,
            sellingPrice: 1,
            discountPercentage: 1,
          },
        },
      },
    ]);
    let nextPage = null;
    if (products.length > limitSlug) {
      nextPage = pageSlug + 1;
      products.pop();
    }
    return response(true, 211, "Product found", { products, nextPage });
  } catch (error) {
    return errorResponse(error);
  }
}
