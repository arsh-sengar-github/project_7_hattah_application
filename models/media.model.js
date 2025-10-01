import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    asset_id: {
      type: String,
      trim: true,
      required: true,
    },
    public_id: {
      type: String,
      trim: true,
      required: true,
    },
    alt: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    path: {
      type: String,
      trim: true,
      required: true,
    },
    secure_url: {
      type: String,
      trim: true,
      required: true,
    },
    thumbnail_url: {
      type: String,
      trim: true,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);
const MediaModel =
  mongoose.models.Media || mongoose.model("Media", mediaSchema, "medias");

export default MediaModel;
