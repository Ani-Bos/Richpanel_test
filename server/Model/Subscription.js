import mongoose from "mongoose";

const subscriptionPlanSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["monthly", "yearly"], required: true },
    monthlyPrice: { type: Number, required: true },
    videoQuality: { type: String, required: true },
    resolution: { type: String, required: true },
    devices: [String],
  },
  { timestamps: true }
);

const SubscriptionPlan = mongoose.model(
  "SubscriptionPlan",
  subscriptionPlanSchema
);

export default SubscriptionPlan;
