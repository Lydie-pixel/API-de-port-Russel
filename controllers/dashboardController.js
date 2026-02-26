const catwayService = require("../services/catwayService");
const reservationService = require("../services/reservationService");
const userService = require("../services/userService");


// Page HTML (vide)
exports.renderDashboard = (req, res) => {
  res.render("pages/dashboard");
};


// API Dashboard
exports.getDashboardData = async (req, res) => {
  try {

    const catways = await catwayService.getAll();
    const reservations = await reservationService.getAll();
    const users = await userService.getAll();

    const today = new Date();

    // Réservations en cours
    const activeReservations = reservations.filter(r =>
      new Date(r.startDate) <= today &&
      new Date(r.endDate) >= today
    );

    // Prochaines réservations
    const upcoming = reservations
      .filter(r => new Date(r.startDate) > today)
      .sort((a,b)=> new Date(a.startDate)-new Date(b.startDate))
      .slice(0,5);

    res.json({
      totalCatways: catways.length,
      totalReservations: reservations.length,
      active: activeReservations,
      upcoming
    });

  } catch (err) {

    res.status(500).json({
      error: "Erreur dashboard"
    });

  }
};