const router = require("express").Router();
let List = require("../models/list.model");

router.route("/").post((req, res) => {
  List.find()
    .then((list) => {
      res.json(list.filter((e) => e.userId === req.body.userId));
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

    const newitem = new List({
      userId,
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
  List.findById(req.params.id)
    .then((list) => {
      list.userId = req.body.userId;
      list.item = req.body.item;
      list.categoryId = req.body.categoryId;
      list.quantity = req.body.quantity;
      list.subItem = req.body.subItem;

      list
        .save()
        .then(() => res.json("list updated: " + list))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  List.findByIdAndDelete(req.params.id)
    .then((listInfo) => res.json("list deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
