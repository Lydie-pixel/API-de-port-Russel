const express = require("express");
const router = express.Router();

const controller = require("../controllers/catwayController");

// Liste
router.get("/", controller.renderCatways);

// Formulaire
router.get("/new", controller.renderCreateForm);
router.get("/edit/:id", controller.renderEditForm);

// Traitement
router.post("/", controller.createCatway);
router.post("/:id", controller.updateCatway);
router.post("/delete/:id", controller.deleteCatway);

// API
router.get("/json", controller.getAllCatways);
router.get("/json/:id", controller.getCatwayById);

module.exports = router;