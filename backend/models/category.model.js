// NOT COMPELTE FINISH
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    userId: { type: String },
    category: { type: String, trim: true },
    categoryOrder: { type: Number, trim: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
