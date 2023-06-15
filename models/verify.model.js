import mongoose, { model, Schema } from "mongoose";
const verifySchema = new Schema(
  {
    verifyCode: { type: Number, required: true },
    email: { type: String },
    createdAt: {
      type: Date,
      expires: 300,
    },
  },
  { versionKey: false, timestamps: true }
);

const verifyModel = model("verifyCode", verifySchema);
export default verifyModel;