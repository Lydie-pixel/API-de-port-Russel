const express = require("express");
const router = express.Router();

const controller = require("../controllers/reservationController");

// Page EJS
router.get("/", controller.renderReservations);

// Formulaire ajout
router.get("/new", controller.renderCreateForm);

// Formulaire édition
router.get("/edit/:id", controller.renderEditForm);

// Traitement ajout
router.post("/", controller.createReservation);

// Traitement update
router.post("/:id", controller.updateReservation);

// Suppression
router.post("/:id/delete", controller.deleteReservation);

// API
router.get("/json", controller.getAllReservations);
router.get("/json/:id", controller.getReservationById);
router.post("/json", controller.createReservation);
router.put("/json/:id", controller.updateReservation);
router.delete("/json/:id", controller.deleteReservation);

module.exports = router;