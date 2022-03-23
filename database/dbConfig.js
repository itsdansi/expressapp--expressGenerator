const mongoose = require("mongoose");

let connectionSting = "mongodb://localhost:27017/express_demo";
mongoose
  .connect(connectionSting, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("error connecting to mongodb:" + err.message);
  });
