const User = require("../models/userModel");

// Lire tous les utilisateurs
exports.getAll = () => {
  return User.find();
};

// Lire un utilisateur
exports.getById = (id) => {
  return User.findById(id);
};

// Créer
exports.create = (data) => {
  const user = new User(data);
  return user.save();
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