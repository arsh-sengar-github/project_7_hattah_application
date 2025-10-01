import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
      },
    ],
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    color: {
      type: String,
      trim: true,
      required: true,
    },
    size: {
      type: String,
      trim: true,
      required: true,
    },
    maximumRetailPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    stockKeepingUnit: {
      type: String,
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
const VariantModel =
  mongoose.models.Variant ||
  mongoose.model("Variant", variantSchema, "variants");

export default VariantModel;
