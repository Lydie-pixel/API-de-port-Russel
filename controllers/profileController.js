const userService = require("../services/userService");
const bcrypt = require("bcryptjs");

// Afficher le profil
exports.renderProfile = async (req, res) => {
  try {

    const user = await userService.getById(req.user.id);

    res.render("pages/profile", {
      user,
      error: null,
      success: null
    });

  } catch (err) {
    res.redirect("/");
  }
};


// Changer mot de passe
exports.updatePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await userService.getById(req.user.id);

    // Vérification champs
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.render("pages/profile", {
        user,
        error: "Tous les champs sont obligatoires",
        success: null
      });
    }

    // Vérifier ancien mot de passe
    const isValid = await bcrypt.compare(
      oldPassword,
      user.passwordHash
    );

    if (!isValid) {
      return res.render("pages/profile", {
        user,
        error: "Ancien mot de passe incorrect",
        success: null
      });
    }

    // Vérifier confirmation
    if (newPassword !== confirmPassword) {
      return res.render("pages/profile", {
        user,
        error: "Les mots de passe ne correspondent pas",
        success: null
      });
    }

    // Vérifier sécurité password
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (!regex.test(newPassword)) {
      return res.render("pages/profile", {
        user,
        error:
          "Mot de passe trop faible (12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial)",
        success: null
      });
    }

    // Hash
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    // Update
    const updatedUser = await userService.updatePassword(req.user.id, hash);

    res.render("pages/profile", {
      user: updatedUser,
      error: null,
      success: "Mot de passe modifié avec succès"
    });

  } catch (err) {

    res.render("pages/profile", {
      user: null,
      error: "Erreur serveur",
      success: null
    });

  }
};