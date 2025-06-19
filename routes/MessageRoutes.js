const express = require('express');
const { validationResult } = require("express-validator");
const router = express.Router();
const messageController = require('../controllers/MessageController');
const isAdmin = require('../middleware/isAdmin')
const validator = require("../validators/message.validator");
const rateLimit = require("../middleware/rateLimitMiddle");
const asyncHandler = require("../middleware/asyncHandler");

// middleware‑проверка ошибок валидации
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

router.get('/', (req, res, next) => {
  console.log('⚡️ [Router] GET /api/contact → enter');
  next();
}, messageController.getAllMessages);

router.get('/:id', messageController.getMessageById);
router.post('/', rateLimit,validator.create, checkValidation, messageController.createMessage);
router.put("/:id/reply", isAdmin, asyncHandler (messageController.replyMessage));
router.delete('/:id',isAdmin, asyncHandler (messageController.deleteMessage));

module.exports = router;
