const User = require('../models/user.model');

async function authMiddleware(req, res, next) {
  const userId = req.header('x-user-id');

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = user;
  next();
}

module.exports = authMiddleware;
