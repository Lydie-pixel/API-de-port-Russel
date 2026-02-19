const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

// Page EJS
router.get("/", controller.renderUsers);

// API
router.get("/json", controller.getAllUsers);
router.get("/json/:id", controller.getUserById);
router.post("/json", controller.createUser);
router.put("/json/:id", controller.updateUser);
router.delete("/json/:id", controller.deleteUser);

module.exports = router;