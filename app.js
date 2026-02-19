const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());

// Connexion MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/port-russel")
  .then(() => console.log(" MongoDB connecté"))
  .catch(err => console.error(" Erreur MongoDB :", err));

// Routes
const catwayRoutes = require("./routes/catwayRoutes");
app.use("/api/catways", catwayRoutes);

// Serveur
const PORT = 3000;

app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});