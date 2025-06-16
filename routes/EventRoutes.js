const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');
const isAdmin = require('../middleware/isAdmin')

router.get('/', eventController.getAllEvents);
router.get('/:slug', eventController.getEventBySlug);
router.post('/', isAdmin, eventController.createEvent);
router.put('/:slug', isAdmin, eventController.updateEvent);
router.delete('/:slug', isAdmin, eventController.deleteEvent);

module.exports = router;
