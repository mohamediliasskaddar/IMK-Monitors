const axios = require('axios');
const Site = require('./models/Site');
const Log = require('./models/Log');

const checkSites = async () => {
  console.log("🔁 Checking all sites...");

  const sites = await Site.find();

  for (const site of sites) {
    try {
      const response = await axios.get(site.url);
      const status = response.status;

      console.log(`✅ ${site.url} OK (${status})`);

      await Log.create({
        site: site._id,
        status: 'up',
        addedAt: new Date()
      });
    } catch (error) {
      console.log(`❌ ${site.url} DOWN`);

      await Log.create({
        site: site._id,
        status: 'down',
        addedAt: new Date()
      });
    }
  }
};

// ✅ EXPORT the function
module.exports = checkSites;
