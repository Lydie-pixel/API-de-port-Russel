const express = require("express");
const router = express.Router();

const controller = require("../controllers/catwayController");

// Page EJS
router.get("/", controller.renderCatways);

// Formulaire ajout
router.get("/new", controller.renderCreateForm);

// Formulaire édition
router.get("/edit/:id", controller.renderEditForm);

// Traitement ajout
router.post("/", controller.createCatway);

// Traitement update
router.post("/:id", controller.updateCatway);

// Suppression
router.post("/delete/:id", controller.deleteCatway);


// API
router.get("/json", controller.getAllCatways);
router.get("/json/:id", controller.getCatwayById);
router.post("/json", controller.createCatway);
router.put("/json/:id", controller.updateCatway);
router.delete("/json/:id", controller.deleteCatway);

module.exports = router;