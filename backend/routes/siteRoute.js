const express = require('express');
const router = express.Router();
const Site = require('../models/Site');
const { verifyToken, isAdmin } = require('../middleware/auth_mdw');


// GET all sites
router.get('/', verifyToken,  async (req, res) => {
  try {
    const sites = await Site.find().populate('owner');
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one site
router.get('/:id',verifyToken, async (req, res) => {
  try {
    const site = await Site.findById(req.params.id).populate('owner');
    if (!site) return res.status(404).json({ message: 'Site not found' });
    res.json(site);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a site
router.post('/',verifyToken, async (req, res) => {
  const { owner, url, urlname, alertEmail } = req.body;
  const site = new Site({ owner, url, urlname, alertEmail });

  try {
    const newSite = await site.save();
    res.status(201).json(newSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a site
router.put('/:id',verifyToken, async (req, res) => {
  try {
    const updated = await Site.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Site not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a site
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Site.findByIdAndDelete(req.params.id);
    res.json({ message: 'Site deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
