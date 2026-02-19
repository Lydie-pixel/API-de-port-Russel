const express = require("express");
const router = express.Router();

const controller = require("../controllers/catwayController");

// Page EJS
router.get("/", controller.renderCatways);

// API
router.get("/json", controller.getAllCatways);
router.get("/json/:id", controller.getCatwayById);
router.post("/json", controller.createCatway);
router.put("/json/:id", controller.updateCatway);
router.delete("/json/:id", controller.deleteCatway);

module.exports = router;