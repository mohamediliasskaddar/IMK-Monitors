const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth_mdw');
const Config = require('../models/Config');

// GET /api/config/check-interval
router.get('/check-interval', verifyToken, async (req, res) => {
  const entry = await Config.findOne({ key: 'checkInterval' });
  res.json({ checkIntervalMinutes: entry.value });
});



// PUT /api/config/check-interval
router.put('/check-interval', verifyToken, async (req, res) => {
  const { checkInterval } = req.body;

  if (!checkInterval || isNaN(checkInterval) || checkInterval < 1) {
    return res.status(400).json({ message: 'Intervalle invalide' });
  }

  try {
    const config = await Config.findOneAndUpdate(
      { key: 'checkInterval' },
      { value: checkInterval },
      { new: true, upsert: true }
    );
    res.json({ message: 'Interval mis à jour', config });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
