// routes/creneauRoutes.js
const express = require('express');
const router = express.Router();
const creneauController = require('../models/controllers/CreneauController');
const isAdmin = require('../middleware/isAdmin');

router.get('/', creneauController.getAllCreneaux);
router.post('/',  isAdmin, creneauController.createCreneau);
router.put('/:id',  isAdmin, creneauController.updateCreneau);
router.delete('/:id',  isAdmin, creneauController.deleteCreneau);

module.exports = router;
