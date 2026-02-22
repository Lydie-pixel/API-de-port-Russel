const Catway = require("../models/catwayModel");

// Lire tous les catways
exports.getAll = () => {
  return Catway.find();
};

// Lire un catway
exports.getById = (id) => {
  return Catway.findById(id);
};

// Créer
exports.create = (data) => {
  const alFieldsOk = true;
  
   if (!data.name || !data.description) {
    return { error: "Tous les champs sont requis.",data : data };
  }
  const catway = new Catway(data);
  return catway.save();
};

// Modifier
exports.update = (id, data) => {
  return Catway.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
};

// Supprimer
exports.delete = (id) => {
  return Catway.findByIdAndDelete(id);
};