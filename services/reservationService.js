/**
 * Service de gestion des réservations
 * Communication avec MongoDB
 */
const Reservation = require("../models/reservationModel");

// Lire toutes les réservations
exports.getAll = () => {
  return Reservation.find().sort({ startDate: -1 });
};

// Lire une réservation
exports.getById = (id) => {
  return Reservation.findById(id);
};

// Créer
exports.create = async (data) => {

  // Vérification champs
  if (
    !data.catwayNumber ||
    !data.clientName ||
    !data.boatName ||
    !data.startDate ||
    !data.endDate
  ) {
    throw new Error("Tous les champs sont requis.");
  }

  const start = new Date(data.startDate);
  const end = new Date(data.endDate);

  // Vérification dates
  if (start >= end) {
    throw new Error("La date de fin doit être après la date de début");
  }

  // Vérifier chevauchement
  const overlap = await Reservation.findOne({
    catwayNumber: data.catwayNumber,

    $or: [
      {
        startDate: { $lte: end },
        endDate: { $gte: start }
      }
    ]
  });

  if (overlap) {
    throw new Error("Ces dates sont déjà réservées pour ce catway");
  }

  // Création
  const reservation = new Reservation(data);
  return await reservation.save();
};

// Modifier
exports.update = (id, data) => {
  return Reservation.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
};

// Supprimer
exports.delete = (id) => {
  return Reservation.findByIdAndDelete(id);
};