const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Lire tous les utilisateurs
exports.getAll = () => {
  return User.find();
};

// Lire un utilisateur
exports.getById = (id) => {
  return User.findById(id);
};

// Lire un utilisateur
exports.findByUserName = (userName) => {
  return User.findOne({ userName :userName });
};

// Créer
exports.create = (data) => {
  const salt = bcrypt.genSaltSync(10);
data.passwordHash = bcrypt.hashSync(data.password, salt);
  try{
  const user = new User(data);
  return user.save();
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur:", err);
  }
    
};

// Modifier
exports.update = (id, data) => {
  return User.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
};

// Supprimer
exports.delete = (id) => {
  return User.findByIdAndDelete(id);
};