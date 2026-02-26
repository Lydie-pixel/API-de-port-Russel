const express = require("express");
const router = express.Router();

const requireAuth = require("../middlewares/requireAuth");
const controller = require("../controllers/profileController");

// Profil
router.get("/", requireAuth, controller.renderProfile);

// Changer mot de passe
router.post("/password", requireAuth, controller.updatePassword);

module.exports = router;