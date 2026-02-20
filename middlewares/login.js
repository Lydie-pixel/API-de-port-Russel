exports.login = async (req, res) => {
  try {
    const { userMail, password } = req.body;

    const user = await userService.findByEmail(userMail);

    if (!user) {
      return res.send("Utilisateur inconnu");
    }

    const isValid = await bcrypt.compare(password, user.password);

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
    res.status(500).send("Erreur login");
  }
};