const express = require("express");
const router = express.Router();

const controller = require("../controllers/catwayController");

// Page EJS
router.get("/", controller.renderCatways);

// API
router.get("/api", controller.getAllCatways);
router.get("/api/:id", controller.getCatwayById);
router.post("/api/", controller.createCatway);
router.put("/api/:id", controller.updateCatway);
router.delete("/api/:id", controller.deleteCatway);

module.exports = router;