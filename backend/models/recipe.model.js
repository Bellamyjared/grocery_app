const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    userId: { type: String },
    title: { type: String, trim: true },
    favorite: { type: Boolean },
    ingredients: { type: Array },
    directions: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
