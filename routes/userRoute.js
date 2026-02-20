const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

// Page EJS
router.get("/", controller.renderUsers);

// Formulaire ajout
router.get("/new", controller.renderCreateForm);

// Formulaire édition
router.get("/edit/:id", controller.renderEditForm);

// Traitement ajout
router.post("/", controller.createUser);

// Traitement update
router.post("/:id", controller.updateUser);

// Suppression
router.post("/:id/delete", controller.deleteUser);


// API
router.get("/json", controller.getAllUsers);
router.get("/json/:id", controller.getUserById);
router.post("/json", controller.createUser);
router.put("/json/:id", controller.updateUser);
router.delete("/json/:id", controller.deleteUser);

module.exports = router;