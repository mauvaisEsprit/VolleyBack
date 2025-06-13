const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');
const isAdmin = require('../middleware/isAdmin')

router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getMessageById);
router.post('/', messageController.createMessage);
router.post("/:id/reply", isAdmin, messageController.replyMessage);
router.delete('/:id',isAdmin, messageController.deleteMessage);

module.exports = router;
