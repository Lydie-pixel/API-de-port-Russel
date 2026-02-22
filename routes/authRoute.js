const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

// Page login
router.get("/login", (req, res) => {
  res.render("pages/login");
});

// Traitement login
router.post("/login", controller.login);

// Logout
router.get("/logout", controller.logout);

module.exports = router;