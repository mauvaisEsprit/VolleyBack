const express = require('express');
const router = express.Router();
const newsController = require('../models/controllers/NewsController');
const isAdmin = require('../middleware/isAdmin')

router.get('/', newsController.getAllNews);
router.get('/:slug', newsController.getNewsBySlug);
router.post('/', isAdmin, newsController.createNews);
router.put('/:slug',isAdmin, newsController.updateNews);
router.delete('/:slug',isAdmin, newsController.deleteNews);

module.exports = router;
