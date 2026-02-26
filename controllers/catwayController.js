/**
 * Controller de gestion des catways
 * Gère les pages HTML, l'authentification et l'API REST
 * @module catwayController
 */
const catwayService = require("../services/catwayService");

//========= PAGES HTML ==========

/**
 * Affiche la liste des catways
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 */
exports.renderCatways = async (req, res) => {
  try {

    const catways = await catwayService.getAll();

    res.render("pages/catway", { catways });

  } catch (err) {

    res.status(500).send("Erreur serveur");
  }
};


/**
 * Affiche le formulaire de création d'un catway
 * @param {Object} req
 * @param {Object} res
 */
exports.renderCreateForm = (req, res) => {
  res.render("pages/formulaireCatway", {
    catway: null,
    error: null,
    isEdit: false
  });
};


/**
 * Affiche le formulaire de modification d'un catway
 * @param {Object} req
 * @param {Object} res
 */
exports.renderEditForm = async (req, res) => {
  try {

    const catway = await catwayService.getById(req.params.id);

    if (!catway) {
      return res.redirect("/catways");
    }

    res.render("pages/formulaireCatway", {
      catway,
      error: null,
      isEdit: true
    });

  } catch (err) {
    res.status(400).render("pages/formulaireCatway", {
      error: err.message,
      catway: null,
      isEdit: false
    });
  }
};


/**
 * Crée un catway depuis un formulaire HTML
 * @param {Object} req
 * @param {Object} res
 */
exports.createCatway = async (req, res) => {
  try {

    await catwayService.create(req.body);

    res.redirect("/catways");

  } catch (err) {

    res.status(400).render("pages/formulaireCatway", {
      error: err.message,
      catway: req.body,
      isEdit: false
    });
  }
};


/**
 * Met à jour un catway depuis une page HTML
 * @param {Object} req
 * @param {Object} res
 */
exports.updateCatway = async (req, res) => {
  try {

    const oldCatway = await catwayService.getById(req.params.id);

    if (!oldCatway) {
      return res.status(404).send("Catway introuvable");
    }

    // Sécurité : on interdit la modification
    if (
      req.body.catwayNumber !== oldCatway.catwayNumber ||
      req.body.catwayType !== oldCatway.catwayType
    ) {
      return res.status(400).render("pages/formulaireCatway", {
        error: "Le numéro et le type ne peuvent pas être modifiés",
        catway: oldCatway,
        isEdit: true
      });
    }

    await catwayService.update(req.params.id, req.body);

    res.redirect("/catways");

  } catch (err) {

    res.status(400).render("pages/formulaireCatway", {
      error: err.message,
      catway: req.body,
      isEdit: true
    });

  }
};

/**
 * Supprime un catway depuis l'interface
 * @param {Object} req
 * @param {Object} res
 */
exports.deleteCatway = async (req, res) => {
  try {

    await catwayService.delete(req.params.id);

    res.redirect("/catways");

  } catch (err) {

    res.status(500).send("Erreur suppression");
  }
};



// =========== API REST (JSON) ===========


/**
 * Récupère tous les catways (API)
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Liste des catways
 */
exports.getAllCatways = async (req, res) => {
  try {

    const catways = await catwayService.getAll();

    res.status(200).json(catways);

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
};


/**
 * Récupère un catway par ID (API)
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Catway
 */
exports.getCatwayById = async (req, res) => {
  try {

    const catway = await catwayService.getById(req.params.id);

    if (!catway) {
      return res.status(404).json({ message: "Introuvable" });
    }

    res.status(200).json(catway);

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
};


/**
 * Crée un catway via l'API
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Catway créé
 */
exports.createCatwayApi = async (req, res) => {
  try {

    const catway = await catwayService.create(req.body);

    res.status(201).json(catway);

  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};


/**
 * Met à jour un catway via l'API
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Catway modifié
 */
exports.updateCatwayApi = async (req, res) => {
  try {

    const catway = await catwayService.update(req.params.id, req.body);

    if (!catway) {
      return res.status(404).json({ message: "Introuvable" });
    }

    res.status(200).json(catway);

  } catch (err) {

    res.status(400).json({ error: err.message });
  }
};


/**
 * Supprime un catway via l'API
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Message de confirmation
 */
exports.deleteCatwayApi = async (req, res) => {
  try {

    const catway = await catwayService.delete(req.params.id);

    if (!catway) {
      return res.status(404).json({ message: "Introuvable" });
    }

    res.status(200).json({ message: "Supprimé" });

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
};