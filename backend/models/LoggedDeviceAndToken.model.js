// NOT COMPELTE FINISH
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loggedDeviceAndTokenSchema = new Schema(
  {
    deviceInfo: { type: String, trim: true },
    deviceToken: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const LoggedDeviceAndToken = mongoose.model(
  "LoggedDeviceAndToken",
  loggedDeviceAndTokenSchema
);

module.exports = LoggedDeviceAndToken;
