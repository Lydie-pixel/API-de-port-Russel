const userService = require("../services/userService");

// Page HTML
exports.renderUsers = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.render("pages/user", { users });
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
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

    const user = await userService.update(req.params.id, req.body);

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
    res.status(400).send("Erreur création");
  }
};

// PUT
exports.updateUser = async (req, res) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    res.redirect("/users");
  } catch (err) {
    res.status(400).send("Erreur modification");
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.delete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};