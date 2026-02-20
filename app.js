const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Connexion MongoDB
mongoose.connect("mongodb+srv://Lydie:Lareunion974!@russel.qrx53bn.mongodb.net/?appName=Russel")
  .then(() => console.log(" MongoDB connecté"))
  .catch(err => console.error("Erreur MongoDB :", err));

// Middleware d'authentification
const auth = require("./middlewares/auth");

//Views avec EJS
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const indexRoute = require("./routes/indexRoute");
const catwayRoutes = require("./routes/catwayRoute");
const reservationRoutes = require("./routes/reservationRoute");
const userRoutes = require("./routes/userRoute");
const dashboardRoute = require("./routes/dashboardRoute");

// Pages EJS
app.use("/", indexRoute);
app.use("/catways", auth, catwayRoutes);
app.use("/users", auth, userRoutes);
app.use("/reservations", auth, reservationRoutes);
app.use("/",auth, dashboardRoute);

// API
app.use("/api/catways", catwayRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);

// Serveur
const PORT = 3000;

app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});