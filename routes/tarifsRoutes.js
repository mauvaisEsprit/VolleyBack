const express = require("express");
const router = express.Router();
const tarifsController = require("../models/controllers/tarifsController");
const isAdmin = require("../middleware/isAdmin");

router.get("/", tarifsController.getAll);
router.get("/:id",  tarifsController.getById);
router.post("/", isAdmin, tarifsController.create);
router.put("/:id",  isAdmin, tarifsController.update);
router.delete("/:id",  isAdmin, tarifsController.delete);

module.exports = router;
