const router = require("express").Router();
let Item = require("../models/item.model");

router.route("/").post((req, res) => {
  Item.find()
    .then((item) => {
      res.json(item.filter((e) => e.userId === req.body.userId));
    })
    .catch((err) => res.json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  const item = req.body.item;
  const categoryId = req.body.categoryId;
  const subItems = req.body.subItems;

  const newitem = new Item({
    userId,
    item,
    categoryId,
    subItems,
  });

  newitem
    .save()
    .then((id) => res.json(id._id))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then((itemInfo) => res.json("item deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      item.userId = req.body.userId;
      item.item = req.body.item;
      item.categoryId = req.body.categoryId;
      item.subItems = req.body.subItems;

      item
        .save()
        .then(() => res.json("item updated: " + item))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
