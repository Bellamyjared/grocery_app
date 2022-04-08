const router = require("express").Router();
let Category = require("../models/category.model");
// for deleting items with category, if category is deleted
let List = require("../models/list.model");
let Pantry = require("../models/pantry.model");
let Item = require("../models/item.model");

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
router.route("/delete/").post((req, res) => {
  // find all items with category and delete it

  let Errors = [];

  List.find()
    .then((list) => {
      const listItem = list.filter(
        (item) =>
          item.userId === req.body.userId && item.categoryId === req.body.id
      );
      console.log(listItem);
      if (listItem.length != 0) {
        listItem.forEach((item) => {
          List.findByIdAndDelete(item._id)
            .then((i) => {
              console.log(`${i} deleted`);
            })
            .catch((err) => console.log(`${err}`));
        });
      }
    })
    .catch((err) => Errors.append(err));

  Pantry.find()
    .then((list) => {
      const listItem = list.filter(
        (item) =>
          item.userId === req.body.userId && item.categoryId === req.body.id
      );
      console.log(listItem);
      if (listItem.length != 0) {
        listItem.forEach((item) => {
          Pantry.findByIdAndDelete(item._id)
            .then((i) => {
              console.log(`${i} deleted`);
            })
            .catch((err) => console.log(`${err}`));
        });
      }
    })
    .catch((err) => Errors.append(err));

  Item.find()
    .then((list) => {
      const listItem = list.filter(
        (item) =>
          item.userId === req.body.userId && item.categoryId === req.body.id
      );
      console.log(listItem);

      if (listItem.length != 0) {
        listItem.forEach((item) => {
          Item.findByIdAndDelete(item._id)
            .then((i) => {
              console.log(`${i} deleted`);
            })
            .catch((err) => console.log(`${err}`));
        });
      }
    })
    .catch((err) => Errors.append(err));

  Category.findByIdAndDelete(req.body.id)
    .then((i) => {
      res.json(`success, ${i} deleted`);
    })
    .catch((err) => {
      res.status(400).json(`error ${err}`);
    });
});

// delete category
//   Category.findByIdAndDelete(req.params.id)
//     .then((deletedCategory) => {
//       res.json(deletedCategory);
//     })
//     .catch((err) => res.json("Error: " + err));
// });

module.exports = router;
