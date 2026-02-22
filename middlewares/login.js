const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    //const { userName, password } = req.body;
    const userName = "a";
    const password = "S!IInovaTest3";
    const user = await userService.findByUserName(userName);

    if (!user) {
      return res.send("Utilisateur inconnu");
    }
    console.log("password:", password);
    console.log("user.password:", user.passwordHash);
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return res.send("Mot de passe incorrect");
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      "SECRET_KEY",
      { expiresIn: "2h" }
    );

    res.cookie("token", token);
    res.redirect("/dashboard");

  } catch (err) {
    res.status(500).send(err.message);
  }
};