const router = require("express").Router();
let Category = require("../models/category.model");

//GET ALL CATEGORIES
router.route("/").post((req, res) => {
  Category.find()
    .then((category) => {
      res.json(category.filter((e) => e.userId === req.body.userId));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//ADD A NEW CATEGORY
router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  const category = req.body.category;
  const categoryOrder = req.body.categoryOrder;

  const newCategory = new Category({
    userId: userId,
    category: category,
    categoryOrder: categoryOrder,
  });

  newCategory
    .save()
    .then((id) => res.json(id._id))
    .catch((err) => res.json("Error: " + err));
});

//UPDATE CATEGORY INFORMATION BASED OFF ID
router.route("/update/:id").post((req, res) => {
  Category.findById(req.params.id)
    .then((category) => {
      category.userId = req.body.userId;
      category.category = req.body.category;

      category
        .save()
        .then(() => res.json("category updated: " + category))
        .catch((err) => res.json("Error: " + err));
    })
    .catch((err) => res.json("Error: " + err));
});

//DELETE CATEGORY BASED OFF ID
router.route("/:id").delete((req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json("Error: " + err));
});

module.exports = router;
