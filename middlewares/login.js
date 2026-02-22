const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {

    // On récupère les champs du formulaire
    const { userName, password } = req.body;

    // Vérification
    if (!userName || !password) {
      return res.send("Champs manquants");
    }

    // Cherche l'utilisateur
    const user = await userService.findByUserName(userName);

    if (!user) {
      return res.send("Utilisateur inconnu");
    }

    // Vérifie mot de passe
    const isValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isValid) {
      return res.send("Mot de passe incorrect");
    }

    // Création du token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      "SECRET_KEY",
      { expiresIn: "2h" }
    );

    // Cookie
    res.cookie("token", token, {
      httpOnly: true
    });

    res.redirect("/dashboard");

  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur login");
  }
};