const express = require("express");
const router = express.Router();

const controller = require("../controllers/catwayController");

// Pages HTML
router.get("/", controller.renderCatways);
router.get("/new", controller.renderCreateForm);
router.get("/edit/:id", controller.renderEditForm);

// Action des formulaires
router.post("/", controller.createCatway);
router.post("/:id", controller.updateCatway);
router.post("/delete/:id", controller.deleteCatway);


// API REST

/**
 * @swagger
 * /catways/api:
 *   get:
 *     summary: Récupérer tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways
 */
router.get("/api", controller.getAllCatways);

/**
 * @swagger
 * /catways/api/{id}:
 *   get:
 *     summary: Récupérer un catway par ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du catway
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway trouvé
 *       404:
 *         description: Catway introuvable
 */

router.get("/api/:id", controller.getCatwayById);

/**
 * @swagger
 * /catways/api:
 *   post:
 *     summary: Créer un catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: number
 *                 example: 12
 *               catwayType:
 *                 type: string
 *                 example: long
 *               catwayState:
 *                 type: string
 *                 example: Mauvaise état
 *     responses:
 *       201:
 *         description: Catway créé
 *       400:
 *         description: Erreur de validation
 */
router.post("/api", controller.createCatwayApi);

/**
 * @swagger
 * /catways/api/{id}:
 *   put:
 *     summary: Modifier un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayState:
 *                 type: string
 *                 example: Bon état
 *     responses:
 *       200:
 *         description: Catway modifié
 *       404:
 *         description: Introuvable
 */
router.put("/api/:id", controller.updateCatwayApi);

/**
 * @swagger
 * /catways/api/{id}:
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       404:
 *         description: Introuvable
 */
router.delete("/api/:id", controller.deleteCatwayApi);

module.exports = router;