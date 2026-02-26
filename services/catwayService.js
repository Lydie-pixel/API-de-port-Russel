/**
 * Service de gestion des catways
 * Communication avec MongoDB
 */
const Catway = require("../models/catwayModel");

// Lire tous les catways
exports.getAll = () => {
  return Catway.find().sort({ catwayNumber: 1 });;
};

// Lire un catway
exports.getById = (id) => {
  return Catway.findById(id);
};

// Créer
exports.create = async (data) => {
  
   if (!data.catwayNumber || !data.catwayType || !data.catwayState) {
    throw new Error("Tous les champs sont requis.");
  }
  // Vérifie déjà s'il existe
  const existing = await Catway.findOne({
    catwayNumber: data.catwayNumber
  });

  if (existing) {
    throw new Error("Ce catway existe déjà");
  }

  const catway = new Catway(data);
  return await catway.save();
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