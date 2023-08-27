import mongoose from "mongoose";

const PlanSchema = mongoose.Schema(
  {
        user: { type: mongoose.Schema.Types.ObjectId, required: true },
      subscribe:{type:String,required:true},
    type: { type: String, enum: ["monthly", "yearly"], required: true },
    paymentInfo: { type: Object, default: { status: "unsuccesfull" } },
        isActive: {type:Boolean,required:true},
    date:{type:Date,default:Date.now}
  },
  { timestamps: true }
);

const Plan = mongoose.model(
  "Plan",
 PlanSchema
);

export default Plan;
