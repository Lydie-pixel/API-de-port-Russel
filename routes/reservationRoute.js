const express = require("express");
const router = express.Router();

const controller = require("../controllers/reservationController");

// Page EJS
router.get("/", controller.renderReservations);

// API
router.get("/json", controller.getAllReservations);
router.get("/json/:id", controller.getReservationById);
router.post("/json", controller.createReservation);
router.put("/json/:id", controller.updateReservation);
router.delete("/json/:id", controller.deleteReservation);

module.exports = router;