import { connectDatabase } from "@/lib/databaseConnection";
import CategoryModel from "@/models/category.model";
import { response, errorResponse } from "@/lib/helpers";
import MediaModel from "@/models/media.model";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import ProductModel from "@/models/product.model";
import VariantModel from "@/models/variant.model";

function randomElement(array, count = 1) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function POST(request) {
  await connectDatabase();
  try {
    const categories = await CategoryModel.find();
    if (categories.length === 0) {
      return response(false, 404, "Category not found");
    }
    const medias = await MediaModel.find();
    const currMedias = [];
    medias.forEach((media) => {
      currMedias.push(media._id);
    });
    const colors = ["White", "Red", "Green", "Blue", "Black"];
    const sizes = ["S", "M", "L", "XL", "XXL"];
    let products = [];
    let variants = [];
    for (const category of categories) {
      for (let iterator = 0; iterator < 5; ++iterator) {
        const productID = new mongoose.Types.ObjectId();
        const selectedMedia = randomElement(currMedias, 5);
        const maximumRetailPrice = Number(faker.commerce.price(100, 1000, 0));
        const discountPercentage = faker.number.int({ min: 10, max: 90 });
        const sellingPrice = Math.round(
          maximumRetailPrice - (maximumRetailPrice * discountPercentage) / 100
        );
        const product = {
          _id: productID,
          media: selectedMedia,
          fullName: faker.commerce.productName(),
          slug: faker.lorem.slug(),
          category: category._id,
          description: faker.commerce.productDescription(),
          maximumRetailPrice: maximumRetailPrice,
          sellingPrice: sellingPrice,
          discountPercentage: discountPercentage,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        products.push(product);
        for (const color of colors) {
          for (const size of sizes) {
            const variantMedia = randomElement(currMedias, 5);
            variants.push({
              _id: new mongoose.Types.ObjectId(),
              media: variantMedia,
              product: productID,
              color,
              size,
              maximumRetailPrice: product.maximumRetailPrice,
              sellingPrice: product.sellingPrice,
              discountPercentage: product.discountPercentage,
              stockKeepingUnit: `${
                product.slug
              }-${color}-${size}-${faker.number.int({ min: 1000, max: 9999 })}`,
              deletedAt: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        }
      }
    }
    await ProductModel.insertMany(products);
    await VariantModel.insertMany(variants);
    return response(true, 216, "Data generated");
  } catch (error) {
    return errorResponse(error);
  }
}
