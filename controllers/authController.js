const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    // create the user taking the data from the body of the request
    const user = await User.create(req.body);
    res.status(201).json({ message: "Registrazione riuscita", user });
  } catch (err) {
    res.status(500).json({ message: "Errore nella registrazione", err });
  }
};

const login = async (req, res) => {
  // verify there is a user with the same credentials
  const { email, password } = req.body;

  // checks
  if (!email || !password) {
    return res.status(400).json({ message: "Devi inserire email e password" });
  }

  try {
    // find if there is a user with that email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Utente non trovato" });
    }
    // now check if the passsword matches
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Password non corretta" });
    }
    // if everything is ok, generate a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      "segreto",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Errore durante il login", err });
  }
};

module.exports = { register, login };
