// NOT COMPELTE FINISH
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    userId: { type: String },
    item: { type: String, trim: true },
    categoryId: { type: String },
    subItems: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
