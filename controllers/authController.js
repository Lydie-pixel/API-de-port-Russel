
const middlewares = require("../middlewares/login");

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
}

exports.login = (req, res) => {
  middlewares.login(req, res);
}