module.exports = (req, res, next) => {
    
  if (req.user == null ||req.user.role !== "admin") {
    return res.status(403).send("Accès refusé");
  }

  next();
};