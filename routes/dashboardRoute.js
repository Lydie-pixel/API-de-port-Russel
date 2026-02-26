const express = require("express");
const router = express.Router();

const controller = require("../controllers/dashboardController");
const requireAuth = require("../middlewares/requireAuth");

router.get("/", requireAuth, controller.renderDashboard);

// API dashboard
router.get("/api", controller.getDashboardData);

module.exports = router;