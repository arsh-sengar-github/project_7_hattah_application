import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);
const CategoryModel =
  mongoose.models.Category ||
  mongoose.model("Category", categorySchema, "categories");

export default CategoryModel;
