const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connecté"))
  .catch(err => console.error("Erreur MongoDB :", err));

// Middleware d'authentification
const auth = require("./middlewares/auth");
const requireAuth = require("./middlewares/requireAuth");
app.use(auth);
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

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
const authRoutes = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");

// Pages EJS
app.use("/", indexRoute);
app.use("/", authRoutes);
app.use("/profile", requireAuth, profileRoute);
app.use("/catways", requireAuth, catwayRoutes);
app.use("/users", requireAuth, userRoutes);
app.use("/reservations", requireAuth, reservationRoutes);
app.use("/dashboard", requireAuth, dashboardRoute);

// API
app.use("/api/catways", catwayRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);

// Serveur
const PORT = 3000;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});