const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cron = require('node-cron');
const checkSites = require('./monitor'); // ✅ move this up here
const cors = require('cors'); // ✅ Ajouter ceci

const CHECK_INTERVAL = parseInt(process.env.CHECK_INTERVAL_MINUTES, 10) || 5; 


const app = express();

// Middleware pour parser JSON
app.use(express.json());
// ✅ Ajouter ceci AVANT les routes
app.use(cors({
  origin: 'http://localhost:4200', // autorise uniquement Angular
  credentials: true
}));


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/sites', require('./routes/siteRoute'));
app.use('/api/logs', require('./routes/logRoute'));
app.use('/api/config', require('./routes/configRoute'));
const Config = require('./models/Config');

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

async function ensureConfig() {
  const e = await Config.findOne({ key: 'checkInterval' });
  if (!e) {
    await Config.create({
      key: 'checkInterval',
      value: parseInt(process.env.CHECK_INTERVAL_MINUTES, 10) || 20
    });
  }
}

mongoose.connect(process.env.MONGO_URI)
  .then( async () => {
    await ensureConfig();

    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      checkSites(); // ✅ Call it only after server is ready
      
      // Lancer le check toutes les 5 minutes
       cron.schedule('* * * * *', async () => {
        const { value: interval } = await Config.findOne({ key: 'checkInterval' });
        console.log(`⏰ Running site check every ${interval} minutes`);
        checkSites();
      });
    });

  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
