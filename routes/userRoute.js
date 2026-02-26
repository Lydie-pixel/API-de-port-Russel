const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const controller = require("../controllers/userController");


// Pages HTML

// Liste utilisateurs (admin)
router.get("/", auth, admin, controller.renderUsers);

// Profil
router.get("/profile", auth, controller.renderProfile);

// Création
router.get("/new", auth, admin, controller.renderCreateForm);

// Edition
router.get("/edit/:id", auth, admin, controller.renderEditForm);


// Action des formulaires

router.post("/", controller.createUser);
router.post("/:id", controller.updateUser);
router.post("/delete/:id", controller.deleteUser);


// API REST

/**
 * @swagger
 * /users/api:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get("/api", controller.getAllUsers);

/**
 * @swagger
 * /users/api/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Introuvable
 */
router.get("/api/:id", controller.getUserById);

/**
 * @swagger
 * /users/api:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jonh Doe
 *               userName:
 *                 type: string
 *                 example: J.Doe
 *               userMail:
 *                 type: string
 *                 example: johndoe@johndoe.fr
 *               password:
 *                 type: string
 *                 example: MonMotDePasse123!
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Erreur validation
 */
router.post("/api", controller.createUserApi);

/**
 * @swagger
 * /users/api/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     tags: [Users]
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
 *               name:
 *                 type: string
 *               userMail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *       404:
 *         description: Introuvable
 */
router.put("/api/:id", controller.updateUserApi);

/**
 * @swagger
 * /users/api/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Introuvable
 */
router.delete("/api/:id", controller.deleteUserApi);


// ===== AUTH =====

// Déconnexion
router.get("/logout", controller.logout);


module.exports = router;