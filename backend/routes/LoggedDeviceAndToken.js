const router = require("express").Router();
let LoggedDeviceAndToken = require("../models/LoggedDeviceAndToken.model");

//GET DeviceLoggedInCheck BASED OF ID
router.route("/").post((req, res) => {
  LoggedDeviceAndToken.find()
    .then((devices) => {
      res.json(devices.filter((e) => e.deviceInfo === req.body.deviceId));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//ADD A NEW LoggedDeviceAndToken
router.route("/add").post((req, res) => {
  const deviceInfo = req.body.deviceInfo;
  const deviceToken = req.body.deviceToken;

  const newloggedDeviceAndToken = new LoggedDeviceAndToken({
    deviceInfo: deviceInfo,
    deviceToken: deviceToken,
  });

  newloggedDeviceAndToken
    .save()
    .then((id) => res.json(id._id))
    .catch((err) => res.json("Error: " + err));
});

//UPDATE LoggedDeviceAndToken INFORMATION BASED OFF ID
router.route("/update/").post((req, res) => {
  LoggedDeviceAndToken.findById(req.body._id)
    .then((loggedDeviceAndToken) => {
      loggedDeviceAndToken.deviceInfo = req.body.deviceInfo;
      loggedDeviceAndToken.deviceToken = req.body.deviceToken;

      loggedDeviceAndToken
        .save()
        .then(() => res.json("Token updated"))
        .catch((err) => res.json("Error: " + err));
    })
    .catch((err) => res.json("Error: " + err));
});

module.exports = router;
