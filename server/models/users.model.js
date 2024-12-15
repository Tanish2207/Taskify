const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username"],
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },

  name: {
    type: String,
    required: [true, "Please enter your name"]
  }
});


const user = mongoose.model("user", userSchema)
module.exports = user