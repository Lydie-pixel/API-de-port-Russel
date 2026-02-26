const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token =
    req.cookies?.token ||
    req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    req.user = null;
  }

  next();
}

module.exports = authenticateToken;