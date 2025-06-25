const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site', // Refers to the 'Site' model (from Sites schema)
    required: true
  },
  status: {
    type: String,
    enum: ['up', 'down', 'unknown'], // Example statuses
    required: true
  }
}, {
  timestamps: { createdAt: 'addedAt', updatedAt: false } // Rename createdAt to addedAt
});

module.exports = mongoose.model('Log', logSchema);
