const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return res.status(403).json({ message: "Accesso riservato agli admin" });
  }
  next();
};

module.exports = isAdmin;
