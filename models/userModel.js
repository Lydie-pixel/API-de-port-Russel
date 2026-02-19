const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
  },

userName: {
    type: String,
    required: true
  },

userMail: {
    type: String,
    required: true
  },

userPassword: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);