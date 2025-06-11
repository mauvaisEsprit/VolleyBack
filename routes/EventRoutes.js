const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');
const isAdmin = require('../middleware/isAdmin')

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventBySlug);
router.post('/', isAdmin, eventController.createEvent);
router.put('/:id', isAdmin, eventController.updateEvent);
router.delete('/:id', isAdmin, eventController.deleteEvent);

module.exports = router;
