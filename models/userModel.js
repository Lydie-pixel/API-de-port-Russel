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

passwordHash: {
    type: String,
    required: false
  },

password: {
  type: String,
  required: true,
  validate: {
    validator: function(v) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{11,}$/.test(v);
    },
    message: "Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
  }
},

role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
}
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);