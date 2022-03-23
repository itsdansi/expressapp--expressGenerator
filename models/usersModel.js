const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  //   id: Number,
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
