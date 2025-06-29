const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth_mdw');

// GET /api/config/check-interval
router.get('/check-interval', verifyToken, (req, res) => {
  const interval = parseInt(process.env.CHECK_INTERVAL_MINUTES, 10) || 5;
  res.json({ checkIntervalMinutes: interval });
});

module.exports = router;
