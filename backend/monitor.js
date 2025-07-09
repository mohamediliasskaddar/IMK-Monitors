const axios = require('axios');
const Site = require('./models/Site');
const Log = require('./models/Log');
const { sendAlertEmail } = require('./emailService');


async function checkSites() {
  const sites = await Site.find();
  for (let site of sites) {
    try {
      const response = await axios.get(site.url);
      // Succès → reset failures & alertSent
      await Site.findByIdAndUpdate(site._id, {
        consecutiveFailures: 0,
        alertSent: false
      });
      await Log.create({ site: site._id, status: 'up', addedAt: new Date() });
      console.log(`✅ ${site.url} OK`);
    } catch (err) {
      // Échec → incrément failures
      site.consecutiveFailures++;
      await site.save();
      await Log.create({ site: site._id, status: 'down', addedAt: new Date() });
      console.log(`❌ ${site.url} DOWN (#${site.consecutiveFailures})`);
      console.log(`❌  time  (#${new Date()})`);

      // Si 2 échecs consécutifs et pas déjà alerté
      if (site.consecutiveFailures >= 2 && !site.alertSent) {
        await sendAlertEmail(site.alertEmail, site.url);
        site.alertSent = true;
        await site.save();
      }
    }
  }
}
// ✅ EXPORT the function
module.exports = checkSites;
