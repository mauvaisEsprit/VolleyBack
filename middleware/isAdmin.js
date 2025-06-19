const jwt = require('jsonwebtoken');

module.exports = function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Нет токена' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Нет токена' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещён' });
    }
    req.user = decoded; // чтобы дальше можно было использовать данные пользователя
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
};
