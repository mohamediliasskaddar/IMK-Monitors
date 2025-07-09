const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  owner: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User', 
    required: true

  },
  
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Simple URL validation regex
        return /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },

  urlname: {
    type: String,
    required: true,
    trim: true
  },

  alertEmail: {
    type: String,
    required: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  consecutiveFailures: {
     type: Number, default: 0 },  // ← nouveau
  alertSent: {
     type: Boolean, default: false }        // ← pour éviter les doublons
}, {
  timestamps: { createdAt: true, updatedAt: false } // Only createdAt, no updatedAt
});

module.exports = mongoose.model('Site', siteSchema);
