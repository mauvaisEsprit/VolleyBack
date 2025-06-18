const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000,  // 1 минута
  max: 30,               // максимум 30 запросов
  message: 'Слишком много запросов. Попробуйте позже.',
});

module.exports = limiter;
