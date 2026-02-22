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
  const alFieldsOk = true;

  if (!data.name || !data.userName || !data.userMail || !data.password) {
    return { error: "Tous les champs sont requis.",data : data };
  }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{11,}$/.test(data.password)) {
    return { error: "Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",data:data };
  }


  const salt = bcrypt.genSaltSync(10);
data.passwordHash = bcrypt.hashSync(data.password, salt);
  try{
  const user = new User(data);
  return user.save();
  } catch (err) {
    alert("Erreur lors de la création de l'utilisateur: " + err.message);
    return {error: err.message,data:data};
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