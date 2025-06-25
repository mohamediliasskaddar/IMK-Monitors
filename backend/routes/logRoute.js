const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const { verifyToken, isAdmin } = require('../middleware/auth_mdw');

// GET all logss
router.get('/', verifyToken, async (req, res) => {
  try {
    const logs = await Log.find().populate('site');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one log
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const log = await Log.findById(req.params.id).populate('site');
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a log
router.post('/', verifyToken, async (req, res) => {
  const { site, status } = req.body;
  const log = new Log({ site, status });

  try {
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a log
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.json({ message: 'Log deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
