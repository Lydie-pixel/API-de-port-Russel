const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Connexion MongoDB
mongoose.connect("mongodb+srv://Lydie:Lareunion974!@russel.qrx53bn.mongodb.net/?appName=Russel")
  .then(() => console.log(" MongoDB connecté"))
  .catch(err => console.error("Erreur MongoDB :", err));

//Views avec EJS
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const indexRoute = require("./routes/indexRoute");
const catwayRoutes = require("./routes/catwayRoute");
const reservationRoutes = require("./routes/reservationRoute");
const userRoutes = require("./routes/userRoute");

// Pages EJS
app.use("/", indexRoute);
app.use("/catways", catwayRoutes);
app.use("/users", userRoutes);
app.use("/reservations", reservationRoutes);

// API
app.use("/api/catways", catwayRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);

// Serveur
const PORT = 3000;

app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});