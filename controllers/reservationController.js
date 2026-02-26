/**
 * Controller de gestion des réservations
 * Gère les pages HTML, l'authentification et l'API REST
 * @module reservationController
 */
const reservationService = require("../services/reservationService");


// =========================
// PAGES HTML
// =========================

/**
 * Affiche la liste des réservations
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 */
exports.renderReservations = async (req, res) => {
  try {

    const reservations = await reservationService.getAll();

    res.render("pages/reservation", { reservations });

  } catch (err) {

    res.status(500).send("Erreur serveur");
  }
};


/**
 * Affiche le formulaire de création de réservation
 * @param {Object} req
 * @param {Object} res
 */
exports.renderCreateForm = (req, res) => {
  res.render("pages/formulaireReservation", {
    reservation: null,
    error: null,
    isEdit: false
  });
};


/**
 * Affiche le formulaire de modification d'une réservation
 * @param {Object} req
 * @param {Object} res
 */
exports.renderEditForm = async (req, res) => {
  try {

    const reservation = await reservationService.getById(req.params.id);

    if (!reservation) {
      return res.redirect("/reservations");
    }

    res.render("pages/formulaireReservation", {
      reservation,
      error: null,
      isEdit: true
    });

  } catch (err) {

    res.redirect("/reservations");
  }
};


/**
 * Crée une réservation depuis un formulaire HTML
 * @param {Object} req
 * @param {Object} res
 */
exports.createReservation = async (req, res) => {
  try {

    await reservationService.create(req.body);

    res.redirect("/reservations");

  } catch (err) {

    res.status(400).render("pages/formulaireReservation", {
      error: err.message,
      reservation: req.body,
      isEdit: false
    });
  }
};


/**
 * Met à jour une réservation depuis une page HTML
 * @param {Object} req
 * @param {Object} res
 */
exports.updateReservation = async (req, res) => {
  try {

    const reservation = await reservationService.update(
      req.params.id,
      req.body
    );

    if (!reservation) {
      return res.redirect("/reservations");
    }

    res.redirect("/reservations");

  } catch (err) {

    res.status(400).send("Erreur modification");
  }
};


/**
 * Supprime une réservation depuis l'interface
 * @param {Object} req
 * @param {Object} res
 */
exports.deleteReservation = async (req, res) => {
  try {

    await reservationService.delete(req.params.id);

    res.redirect("/reservations");

  } catch (err) {

    res.status(500).send("Erreur suppression");
  }
};



// =========================
// API REST
// =========================


/**
 * Récupère toutes les réservations (API)
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Liste des réservations
 */
exports.getAllReservations = async (req, res) => {
  try {

    const reservations = await reservationService.getAll();

    res.status(200).json(reservations);

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
};


/**
 * Récupère une réservation par ID (API)
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Réservation
 */
exports.getReservationById = async (req, res) => {
  try {

    const reservation = await reservationService.getById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Introuvable" });
    }

    res.status(200).json(reservation);

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
};


/**
 * Crée une réservation via l'API
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Réservation créée
 */
exports.createReservationApi = async (req, res) => {
  try {

    const reservation = await reservationService.create(req.body);

    res.status(201).json(reservation);

  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};


/**
 * Met à jour une réservation via l'API
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Réservation modifiée
 */
exports.updateReservationApi = async (req, res) => {
  try {

    const reservation = await reservationService.update(
      req.params.id,
      req.body
    );

    if (!reservation) {
      return res.status(404).json({ message: "Introuvable" });
    }

    res.status(200).json(reservation);

  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};


/**
 * Supprime une réservation via l'API
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Message de confirmation
 */
exports.deleteReservationApi = async (req, res) => {
  try {

    const reservation = await reservationService.delete(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Introuvable" });
    }

    res.status(200).json({ message: "Supprimé" });

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
};