const reservationService = require("../services/reservationService");

// Page HTML
exports.renderReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAll();
    res.render("pages/reservation", { reservations });
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

// API JSON
// GET ALL
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAll();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await reservationService.getById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
exports.createReservation = async (req, res) => {
  try {
    const reservation = await reservationService.create(req.body);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await reservationService.update(req.params.id, req.body);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await reservationService.delete(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};