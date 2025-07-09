// models/Config.js
const mongoose = require('mongoose');
const configSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: mongoose.Schema.Types.Mixed
});
module.exports = mongoose.model('Config', configSchema);
