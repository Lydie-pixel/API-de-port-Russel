function requireAuth(req, res, next) {
  if (!req.user) {
    return res.redirect("/login");
    // ou: res.status(401).json({ error: "Non autorisé" });
  }

  next();
}

module.exports = requireAuth;