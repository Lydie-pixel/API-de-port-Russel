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
// Formulaire AJOUT (vide)
exports.renderCreateForm = (req, res) => {
  res.render("pages/formulaireReservation", { reservation: null });
};

// Formulaire MODIFICATION (rempli)
exports.renderEditForm = async (req, res) => {
  try {
    const reservation = await reservationService.getById(req.params.id);

    if (!reservation) {
      return res.status(404).send("Réservation introuvable");
    }

    res.render("pages/formulaireReservation", { reservation });

  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

// Formulaire modification
exports.updateReservation = async (req, res) => {
  try {

    const oldReservation = await reservationService.getById(req.params.id);

    if (!oldReservation) {
      return res.status(404).send("Réservation introuvable");
    }

    const reservation = await reservationService.update(req.params.id, req.body);

    res.redirect("/reservations");

  } catch (err) {
    res.status(400).send("Erreur modification");
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