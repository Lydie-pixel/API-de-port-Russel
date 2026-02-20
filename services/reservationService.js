const User = require("../models/reservationModel");

// Lire toutes les réservations
exports.getAll = () => {
  return Reservation.find();
};

// Lire une réservation
exports.getById = (id) => {
  return Reservation.findById(id);
};

// Créer
exports.create = (data) => {
  const reservation = new Reservation(data);
  return reservation.save();
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