const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    userId: { type: String },
    item: { type: String, trim: true },
    categoryId: { type: String },
    quantity: { type: Number, trim: true },
    subItem: { type: Object },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);

module.exports = List;
