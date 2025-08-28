import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
        name: String,
        price: Number,
        qty: Number
      }
    ],
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "preparing", "ready", "completed", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
