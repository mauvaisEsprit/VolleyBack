const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController');
const isAdmin = require('../middleware/isAdmin')

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsBySlug);
router.post('/', isAdmin, newsController.createNews);
router.put('/:id',isAdmin, newsController.updateNews);
router.delete('/:id',isAdmin, newsController.deleteNews);

module.exports = router;
