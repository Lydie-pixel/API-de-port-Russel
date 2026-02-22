const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Page HTML
exports.renderUsers = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.render("pages/user", { users });
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

exports.renderProfile = async (req, res) => {

  const user = await userService.getById(req.user.id);

  res.render("pages/profile", { user });
};

exports.register = async (req, res) => {
  try {
    const { name, userName, userMail, password } = req.body;


    await userService.create({
      name,
      userName,
      userMail,
      password
    });

    res.redirect("/login");

  } catch (err) {
    res.status(400).send("Erreur inscription");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

// Formulaire AJOUT (vide)
exports.renderCreateForm = (req, res) => {
  res.render("pages/formulaireUser", { user: null });
};

// Formulaire MODIFICATION (rempli)

exports.renderEditForm = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);

    if (!user) {
      return res.redirect("/users");
    }

    res.render("pages/formulaireUser", {
      user
    });

  } catch (err) {
    res.redirect("/users");
  }
};

// Formulaire modification
exports.updateUser = async (req, res) => {
  try {
    const oldUser = await userService.getById(req.params.id);

    if (!oldUser) {
      return res.status(404).send("Utilisateur introuvable");
    }

    await userService.update(req.params.id, req.body);

    res.redirect("/users");

  } catch (err) {
    res.status(400).send("Erreur modification");
  }
};

// API JSON
// GET ALL
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
exports.createUser = async (req, res) => {
  try {
    await userService.create(req.body);
    res.redirect("/users");
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur:", err);
    res.status(400).send("Erreur création");
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  try {
    await userService.delete(req.params.id);
    res.redirect("/users");
  } catch (err) {
    res.status(500).send("Erreur suppression");
  }
};