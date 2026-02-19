const express = require("express");
const router = express.Router();

const controller = require("../controllers/catwayController");

router.get("/", controller.getAllCatways);
router.get("/:id", controller.getCatwayById);
router.post("/", controller.createCatway);
router.put("/:id", controller.updateCatway);
router.delete("/:id", controller.deleteCatway);

module.exports = router;