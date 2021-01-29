import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  name: String,
  quantity: Number,
});

export default mongoose.model("items", itemSchema);
