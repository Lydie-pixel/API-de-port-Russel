const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

// Liste
router.get("/", controller.renderUsers);

// Formulaire
router.get("/new", controller.renderCreateForm);
router.get("/edit/:id", controller.renderEditForm);

// Traitement
router.post("/", controller.createUser);
router.post("/:id", controller.updateUser);
router.post("/delete/:id", controller.deleteUser);

// API
router.get("/json", controller.getAllUsers);
router.get("/json/:id", controller.getUserById);

module.exports = router;