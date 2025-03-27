const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // verify the token is actually received and used
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token mancante o invalido" });
  }

  const token = authHeader.split(' ')[1]; //

  try{
    const decoded = jwt.verify(token, 'segreto')
    req.user = decoded;
    next();
  } catch(e){
    return res.status(401).json({ message: "Token non valido" });
  }
};

module.exports = authMiddleware;
