const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const controller = require("../controllers/userController");

//Profils
const admin = require("../middlewares/admin"); 
router.get("/", auth, admin, controller.renderUsers);
router.get("/profil", auth, controller.renderProfile);

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

// Profil utilisateur
router.get("/profile", auth, controller.renderProfile);

// Changement mot de passe
router.post("/change-password", auth, controller.changePassword);

// Déconnexion
router.get("/logout", controller.logout);

module.exports = router;