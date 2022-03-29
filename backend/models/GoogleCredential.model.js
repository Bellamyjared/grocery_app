// NOT COMPELTE FINISH
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GoogleCredentialSchema = new Schema({
  expoClientId: { type: String },
  androidClientId: { type: String },
  iosClientId: { type: String },
});

const GoogleCredential = mongoose.model(
  "GoogleCredential",
  GoogleCredentialSchema
);

module.exports = GoogleCredential;
