const express = require("express");
const router = express.Router();

const controller = require("../controllers/reservationController");

// Pages HTML
router.get("/", controller.renderReservations);
router.get("/new", controller.renderCreateForm);
router.get("/edit/:id", controller.renderEditForm);

// Action des formulaires
router.post("/", controller.createReservation);
router.post("/:id", controller.updateReservation);
router.post("/delete/:id", controller.deleteReservation);

// API REST

/**
 * @swagger
 * /reservations/api:
 *   get:
 *     summary: Récupérer toutes les réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Liste des réservations
 */
router.get("/api", controller.getAllReservations);

/**
 * @swagger
 * /reservations/api/{id}:
 *   get:
 *     summary: Récupérer une réservation par ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *       404:
 *         description: Réservation introuvable
 */
router.get("/api/:id", controller.getReservationById);

/**
 * @swagger
 * /reservations/api:
 *   post:
 *     summary: Créer une réservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: number
 *                 example: 5
 *               clientName:
 *                 type: string
 *                 example: Dupont
 *               boatName:
 *                 type: string
 *                 example: Le Marin Bleu
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-05
 *     responses:
 *       201:
 *         description: Réservation créée
 *       400:
 *         description: Erreur de validation
 */
router.post("/api", controller.createReservationApi);

/**
 * @swagger
 * /reservations/api/{id}:
 *   put:
 *     summary: Modifier une réservation
 *     tags: [Reservations]
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
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Réservation modifiée
 *       404:
 *         description: Introuvable
 */
router.put("/api/:id", controller.updateReservationApi);

/**
 * @swagger
 * /reservations/api/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       404:
 *         description: Introuvable
 */
router.delete("/api/:id", controller.deleteReservationApi);

module.exports = router;