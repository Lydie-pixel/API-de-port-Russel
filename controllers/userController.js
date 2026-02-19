const userService = require("../services/userService");

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
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT
exports.updateUser = async (req, res) => {
  try {
    const user = await userService.update(req.params.id, req.body);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
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