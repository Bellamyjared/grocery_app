const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pantrySchema = new Schema(
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

const Pantry = mongoose.model("Pantry", pantrySchema);

module.exports = Pantry;
