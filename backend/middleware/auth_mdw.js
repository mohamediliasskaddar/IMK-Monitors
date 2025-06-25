const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // contient l'id et le role
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.sendStatus(403);
  next();
};

module.exports = { verifyToken, isAdmin };
