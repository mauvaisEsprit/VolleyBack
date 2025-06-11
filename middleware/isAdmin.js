module.exports = function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Нет токена' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Нет токена' });

  next();
};
