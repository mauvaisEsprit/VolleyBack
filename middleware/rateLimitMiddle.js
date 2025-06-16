const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000,  // 1 минута
  max: 2,               // максимум 5 запросов
  message: 'Слишком много запросов. Попробуйте позже.',
});

module.exports = limiter;