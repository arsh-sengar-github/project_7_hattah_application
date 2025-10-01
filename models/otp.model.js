import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    emailAddress: {
      type: String,
      trim: true,
      required: true,
    },
    otp: {
      type: String,
      trim: true,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 20 * 60 * 1000),
    },
  },
  { timestamps: true }
);
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const OTPModel =
  mongoose.models.OTP || mongoose.model("OTP", otpSchema, "otps");

export default OTPModel;
