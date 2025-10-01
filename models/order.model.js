import mongoose from "mongoose";
import { orderStatuses } from "@/lib/utils";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    emailAddress: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
    },
    country: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    landmark: {
      type: String,
      trim: true,
      required: true,
    },
    road: {
      type: String,
      trim: true,
      required: true,
    },
    house: {
      type: String,
      trim: true,
      required: true,
    },
    personalIdentificationNumberCode: {
      type: String,
      trim: true,
      required: true,
    },
    orderNote: {
      type: String,
      trim: true,
    },
    products: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variantID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variant",
          required: true,
        },
        fullName: {
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
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    discount: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    extraDiscount: {
      type: Number,
      required: true,
    },
    payable: {
      type: Number,
      required: true,
    },
    payment_id: {
      type: String,
      trim: true,
      required: true,
    },
    order_id: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: orderStatuses,
      default: "pending",
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema, "orders");
export default OrderModel;
