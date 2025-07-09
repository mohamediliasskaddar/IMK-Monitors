const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',  // ou ton provider
  auth: {
    user: process.env.ALERT_EMAIL,
    pass: process.env.ALERT_PASS
  }
});

async function sendAlertEmail(to, siteUrl) {
  const info = await transporter.sendMail({
    from: `"IMK Monitor" <${process.env.ALERT_EMAIL}>`,
    to,
    subject: `🚨 Alerte panne pour ${siteUrl}`,
    text: `Votre site ${siteUrl} est en panne pour la 2ème fois consécutive.`
  });
  console.log('✉️ Alert email sent:', info.response);
}

module.exports = { sendAlertEmail };
