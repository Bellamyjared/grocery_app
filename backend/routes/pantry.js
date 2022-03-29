const router = require("express").Router();
let Pantry = require("../models/pantry.model");

router.route("/").post((req, res) => {
  Pantry.find()
    .then((pantry) => {
      res.json(pantry.filter((e) => e.userId === req.body.userId));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  for (const i in req.body) {
    const userId = req.body[i].userId;
    const item = req.body[i].item;
    const categoryId = req.body[i].categoryId;
    const quantity = req.body[i].quantity;
    const subItems = req.body[i].subItems;

    const newitem = new Pantry({
      userId: userId,
      categoryId,
      item,
      quantity,
      subItem: subItems,
    });
    // need new error handling method
    newitem
      .save()
      .then((id) => console.log("sucess", id))
      .catch((err) => console.log("error", err));
  }
  res.json("success");
});

router.route("/update/:id").post((req, res) => {
  Pantry.findById(req.params.id)
    .then((pantry) => {
      pantry.userId = req.body.userId;
      pantry.item = req.body.item;
      pantry.categoryId = req.body.categoryId;
      pantry.quantity = req.body.quantity;
      pantry.subItem = req.body.subItem;

      pantry
        .save()
        .then(() => res.json("pantry updated: " + pantry))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Pantry.findByIdAndDelete(req.params.id)
    .then((pantryInfo) => res.json("pantry deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
