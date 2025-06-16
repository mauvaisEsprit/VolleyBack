const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000,  // 1 минута
  max: 2,               // максимум 2 запроса
  message: 'Слишком много запросов. Попробуйте позже.',
});

module.exports = limiter;
