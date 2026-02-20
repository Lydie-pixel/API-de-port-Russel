const catwayService = require("../services/catwayService");
const reservationService = require("../services/reservationService");

exports.renderDashboard = async (req, res) => {
  try {

    const catways = await catwayService.getAll();
    const reservations = await reservationService.getAll();

    // Réservations en cours
    const today = new Date();

    const activeReservations = reservations.filter(r => {
      return new Date(r.startDate) <= today &&
             new Date(r.endDate) >= today;
    });

    // Prochaines réservations
    const upcoming = reservations
      .filter(r => new Date(r.startDate) > today)
      .sort((a,b)=> new Date(a.startDate)-new Date(b.startDate))
      .slice(0,5);

    res.render("pages/dashboard", {
      totalCatways: catways.length,
      totalReservations: reservations.length,
      activeReservations: activeReservations.length,
      upcoming
    });

  } catch (err) {
    res.status(500).send("Erreur dashboard");
  }
};