const express = require("express");
const router = express.Router();

const controller = require("../controllers/reservationController");

// Liste
router.get("/", controller.renderReservations);

// Formulaire
router.get("/new", controller.renderCreateForm);
router.get("/edit/:id", controller.renderEditForm);

// Traitement
router.post("/", controller.createReservation);
router.post("/:id", controller.updateReservation);
router.post("/delete/:id", controller.deleteReservation);

// API
router.get("/json", controller.getAllReservations);
router.get("/json/:id", controller.getReservationById);

module.exports = router;