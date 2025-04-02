const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // verify the token is actually received and used
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Invalid or missing Token");
    res.status(401);
    next(error);
  }

  const token = authHeader.split(" ")[1]; //

  try {
    const decoded = jwt.verify(token, "segreto");
    req.user = decoded;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = authMiddleware;
