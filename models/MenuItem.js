import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    category: { type: String, default: "Main" },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
