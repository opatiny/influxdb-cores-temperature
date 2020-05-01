'use strict';

const debug = require('debug')('log');

const getCoresTemp = require('./getCoresTemp');
const getVendor = require('./getVendor');

async function logger(db) {
  let temperatures = await getCoresTemp();

  db.writePoints([
    {
      measurement: 'temperatures',
      fields: { core1: temperatures[0], core2: temperatures[1] },
      tags: { vendor: await getVendor() },
    },
  ])
    .then(() => debug('new log saved to db'))
    .catch((err) => {
      debug(`Error saving data to InfluxDB! ${err.stack}`);
    });
}

module.exports = logger;
