const express = require("express");
const router = express.Router();
const ctrl = require("../models/controllers/partenairesController");
const isAdmin = require("../middleware/isAdmin");

//  /api/partners
router.get("/", ctrl.getAll);
router.post("/", isAdmin, ctrl.create);
router.put("/:id",  isAdmin, ctrl.update);     // optionnel
router.delete("/:id",  isAdmin, ctrl.remove);

module.exports = router;
