const router = require("express").Router();
let Recipe = require("../models/recipe.model");

//GET ALL CATEGORIES
router.route("/").post((req, res) => {
  Recipe.find()
    .then((recipe) => {
      res.json(recipe.filter((e) => e.userId === req.body.userId));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//ADD A NEW CATEGORY
router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const favorite = req.body.favorite;
  const ingredients = req.body.ingredients;
  const directions = req.body.directions;

  const newRecipe = new Recipe({
    userId: userId,
    title: title,
    favorite: favorite,
    ingredients: ingredients,
    directions: directions,
  });

  newRecipe
    .save()
    .then((id) => res.json(id._id))
    .catch((err) => res.json("Error: " + err));
});

//UPDATE CATEGORY INFORMATION BASED OFF ID
router.route("/update/:id").post((req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      recipe.userId = req.body.userId;
      recipe.title = req.body.title;
      recipe.favorite = req.body.favorite;
      recipe.ingredients = req.body.ingredients;
      recipe.directions = req.body.directions;

      recipe
        .save()
        .then(() => res.json("recipe updated: " + recipe))
        .catch((err) => res.json("Error: " + err));
    })
    .catch((err) => res.json("Error: " + err));
});

//DELETE CATEGORY BASED OFF ID
router.route("/:id").delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((deletedRecipe) => {
      res.json(deletedRecipe);
    })
    .catch((err) => res.json("Error: " + err));
});

module.exports = router;
