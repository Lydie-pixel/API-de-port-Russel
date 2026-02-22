const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");

const app = express();

const authRoutes = require("./routes/authRoute");

app.use("/", authRoutes);

// Connexion MongoDB
mongoose.connect("mongodb+srv://Lydie:Lareunion974!@russel.qrx53bn.mongodb.net/?appName=Russel")
  .then(() => console.log(" MongoDB connecté"))
  .catch(err => console.error("Erreur MongoDB :", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Auth JWT
app.use(auth);

// User dispo pour EJS
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Views
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