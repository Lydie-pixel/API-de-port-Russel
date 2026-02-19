const catwayService = require("../services/catwayService");

// Page HTML
exports.renderCatways = async (req, res) => {
  try {
    const catways = await catwayService.getAll();
    res.render("pages/catway", { catways });
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

// API JSON
// GET ALL
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await catwayService.getAll();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await catwayService.getById(req.params.id);

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
exports.createCatway = async (req, res) => {
  try {
    const catway = await catwayService.create(req.body);
    res.status(201).json(catway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT
exports.updateCatway = async (req, res) => {
  try {
    const catway = await catwayService.update(req.params.id, req.body);

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json(catway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await catwayService.delete(req.params.id);

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};