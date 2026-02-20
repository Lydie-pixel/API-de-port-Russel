const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {
  const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    // Vérifie le token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
    req.user = decoded; 
  } catch (err) {
    // Token invalide → considère l'utilisateur comme non connecté
    req.user = null;
  }

  next();
}

module.exports = authenticateToken;