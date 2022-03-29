const router = require("express").Router();
let GoogleCredential = require("../models/GoogleCredential.model");

//GET Google Ids
router.route("/").get((req, res) => {
  GoogleCredential.find()
    .then((Ids) => {
      console.log(Ids);
      res.json(Ids);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
