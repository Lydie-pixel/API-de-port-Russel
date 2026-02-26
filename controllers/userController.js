/**
 * Controller de gestion des utilisateurs
 * Gère les pages HTML, l'authentification et l'API REST
 * @module userController
 */

const userService = require("../services/userService");
const bcrypt = require("bcryptjs");

// =========================
// PAGES HTML
// =========================


/**
 * Affiche la liste des utilisateurs (page admin)
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 */
exports.renderUsers = async (req, res) => {
  try {

    const users = await userService.getAll();

    res.render("pages/user", { users });

  } catch (err) {

    res.status(500).send("Erreur serveur");
  }
};


/**
 * Affiche le formulaire de création d'utilisateur
 * @param {Object} req
 * @param {Object} res
 */
exports.renderCreateForm = (req, res) => {
  res.render("pages/formulaireUser", {
    user: null,
    error: null,
    isEdit: false
  });
};


/**
 * Affiche le formulaire de modification d'un utilisateur
 * @param {Object} req
 * @param {Object} res
 */
exports.renderEditForm = async (req, res) => {
  try {

    const user = await userService.getById(req.params.id);

    if (!user) {
      return res.redirect("/users");
    }

    res.render("pages/formulaireUser", {
      user,
      error: null,
      isEdit: true
    });

  } catch (err) {

    res.redirect("/users");
  }
};


/**
 * Crée un utilisateur depuis un formulaire HTML
 * @param {Object} req
 * @param {Object} res
 */
exports.createUser = async (req, res) => {
  try {

    await userService.create(req.body);

    res.redirect("/users");

  } catch (err) {

    res.status(400).render("pages/formulaireUser", {
      error: err.message,
      user: req.body,
      isEdit: false
    });
  }
};


/**
 * Met à jour un utilisateur depuis une page HTML
 * @param {Object} req
 * @param {Object} res
 */
exports.updateUser = async (req, res) => {
  try {

    const user = await userService.update(req.params.id, req.body);

    if (!user) {
      return res.redirect("/users");
    }

    res.redirect("/users");

  } catch (err) {

    res.status(400).send("Erreur modification");
  }
};


/**
 * Supprime un utilisateur depuis l'interface
 * @param {Object} req
 * @param {Object} res
 */
exports.deleteUser = async (req, res) => {
  try {

    await userService.delete(req.params.id);

    res.redirect("/users");

  } catch (err) {

    res.status(500).send("Erreur suppression");
  }
};



// =========================
// AUTH
// =========================

/**
 * Déconnecte l'utilisateur
 * Supprime le token JWT
 * @param {Object} req
 * @param {Object} res
 */
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

/**
 * Affiche la page de profil de l'utilisateur connecté
 * @param {Object} req
 * @param {Object} res
 */
exports.renderProfile = async (req, res) => {
  try {

    if (!req.user) {
      return res.redirect("/");
    }

    const user = await userService.getById(req.user.id);

    if (!user) {
      return res.redirect("/");
    }

    res.render("pages/profile", {
      user,
      error: null,
      success: null
    });

  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

// =========================
// API REST
// =========================


/**
 * Récupère tous les utilisateurs (API)
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Liste des utilisateurs
 */
exports.getAllUsers = async (req, res) => {
  try {

    const users = await userService.getAll();

    res.status(200).json(users);

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
};

/**
 * Récupère un utilisateur par ID (API)
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Utilisateur
 */
exports.getUserById = async (req, res) => {
  try {

    const user = await userService.getById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Introuvable" });
    }

    res.status(200).json(user);

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
};


/**
 * Crée un utilisateur via l'API
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Utilisateur créé
 */
exports.createUserApi = async (req, res) => {
  try {

    const user = await userService.create(req.body);

    res.status(201).json(user);

  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};


/**
 * Met à jour un utilisateur via l'API
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Utilisateur modifié
 */
exports.updateUserApi = async (req, res) => {
  try {

    const user = await userService.update(req.params.id, req.body);

    if (!user) {
      return res.status(404).json({ message: "Introuvable" });
    }

    res.status(200).json(user);

  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};


/**
 * Supprime un utilisateur via l'API
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Message de confirmation
 */
exports.deleteUserApi = async (req, res) => {
  try {

    const user = await userService.delete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Introuvable" });
    }

    res.status(200).json({ message: "Supprimé" });

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
};