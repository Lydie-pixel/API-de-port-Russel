/**
 * Service de gestion des utilisateurs
 * Communication avec MongoDB
 */
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
exports.create = async (data) => {
  if (!data.name || !data.userName || !data.userMail || !data.password) {
    throw new Error("Tous les champs sont requis.");
  }

  // Email valide
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!mailRegex.test(data.userMail)) {
    throw new Error("Adresse email invalide");
  }

  // Mot de passe fort
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&§#€£+=\-_.])[A-Za-z\d@$!%*?&§#€£+=\-_.]{12,}$/;

  if (!passwordRegex.test(data.password)) {
    throw new Error(
      "Mot de passe trop faible (12 caractères, majuscule, minuscule, chiffre, spécial)"
    );
  }

  // Username unique
  const existing = await User.findOne({ userName: data.userName });

  if (existing) {
    throw new Error("Ce nom d'utilisateur existe déjà");
  }

  // Hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data.password, salt);

  data.passwordHash = hash;
  delete data.password;

  // Création
  const user = new User(data);
  return await user.save();
};

// Modifier
exports.update = (id, data) => {
  delete data.password;
  delete data.passwordHash;

  return User.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
};

exports.updatePassword = (id, hash) => {
  return User.findByIdAndUpdate(
    id,
    { passwordHash: hash },
    {
      new: true,
      runValidators: true
    }
  );
};


// Supprimer
exports.delete = (id) => {
  return User.findByIdAndDelete(id);
};