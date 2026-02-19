const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

// Page EJS
router.get("/", controller.renderUsers);

// API
router.get("/api", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;