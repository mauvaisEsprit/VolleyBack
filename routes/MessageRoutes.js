const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');
const isAdmin = require('../middleware/isAdmin')
const rateLimit = require("../middleware/rateLimitMiddle");


router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getMessageById);
router.post('/', rateLimit, messageController.createMessage);
router.put("/:id/reply", isAdmin, messageController.replyMessage);
router.delete('/:id',isAdmin, messageController.deleteMessage);

module.exports = router;
