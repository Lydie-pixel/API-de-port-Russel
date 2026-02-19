const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());

// Connexion MongoDB
mongoose.connect("mongodb+srv://Lydie:Lareunion974!@russel.qrx53bn.mongodb.net/?appName=Russel")
  .then(() => console.log(" MongoDB connecté"))
  .catch(err => console.error("Erreur MongoDB :", err));

// Routes
const catwayRoutes = require("./routes/catwayRoute");
app.use("/api/catways", catwayRoutes);

const reservationRoutes = require("./routes/reservationRoute");
app.use("/api/reservations", reservationRoutes);

const userRoutes = require("./routes/userRoute");
app.use("/api/users", userRoutes);

// Serveur
const PORT = 3000;

app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});