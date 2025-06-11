const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Identifiants invalides." });
});

module.exports = router;
