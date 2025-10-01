import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    minimumPurchaseAmount: {
      type: Number,
      required: true,
    },
    validity: {
      type: Date,
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
const CouponModel =
  mongoose.models.Coupon || mongoose.model("Coupon", couponSchema, "coupons");

export default CouponModel;
