const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

const categoryRouter = require("./routes/category");
const itemRouter = require("./routes/item");
const listRouter = require("./routes/list");
const pantryRouter = require("./routes/pantry");
const recipeRouter = require("./routes/recipe");
const LoggedDeviceAndToken = require("./routes/LoggedDeviceAndToken");
const GoogleCredential = require("./routes/GoogleCredential");

app.use("/category", categoryRouter);
app.use("/item", itemRouter);
app.use("/list", listRouter);
app.use("/pantry", pantryRouter);
app.use("/recipe", recipeRouter);
app.use("/LoggedDeviceAndToken", LoggedDeviceAndToken);
app.use("/GoogleCredential", GoogleCredential);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
