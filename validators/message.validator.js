const { body } = require("express-validator");

// Validateur pour POST /api/contact
exports.create = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom doit contenir entre 2 et 50 caractères"),

  body("email")
    .isEmail()
    .withMessage("Veuillez entrer une adresse e-mail valide")
    .normalizeEmail(),

  body("message")
    .trim()
    .isLength({ min: 5, max: 1000 })
    .withMessage("Le message doit contenir entre 5 et 1000 caractères"),
];
