const express = require("express");
const router = express.Router();
//const middlewares = require("../middlewares/login");
const controller = require("../controllers/authController");

// Formulaire login
/*router.get("/login", (req, res) => {
  res.render("pages/login");
});*/

router.post("/login",function(req, res) {
  controller.login(req, res);
});
// Traitement login
//router.post("/login", (req, res) =>);

// Logout
router.get("/logout", controller.logout);

module.exports = router;