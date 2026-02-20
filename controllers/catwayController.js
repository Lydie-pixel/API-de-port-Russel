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

// Formulaire AJOUT (vide)
exports.renderCreateForm = (req, res) => {
  res.render("pages/formulaireCatway", { catway: null });
};

// Formulaire MODIFICATION
exports.renderEditForm = async (req, res) => {
  try {
    const catway = await catwayService.getById(req.params.id);

    if (!catway) {
      return res.redirect("/catways");
    }

    res.render("pages/formulaireCatway", { catway });

  } catch (err) {
    res.redirect("/catways");
  }
};
// Formulaire MODIFICATION (rempli)
exports.updateCatway = async (req, res) => {
  try {

    const oldCatway = await catwayService.getById(req.params.id);

    if (!oldCatway) {
      return res.status(404).send("Catway introuvable");
    }

    // On empêche la modif du numéro et du type
    req.body.catwayNumber = oldCatway.catwayNumber;
    req.body.catwayType = oldCatway.catwayType;

    const catway = await catwayService.update(req.params.id, req.body);

    res.redirect("/catways");

  } catch (err) {
    res.status(400).send("Erreur modification");
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
    await catwayService.create(req.body);
    res.redirect("/catways");
  } catch (err) {
    res.status(400).send("Erreur création");
  }
};

// DELETE
exports.deleteCatway = async (req, res) => {
  try {
    await catwayService.delete(req.params.id);
    res.redirect("/catways");
  } catch (err) {
    res.status(500).send("Erreur suppression");
  }
};