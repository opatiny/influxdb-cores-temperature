'use strict';

const debug = require('debug')('cpuTemp');
const si = require('systeminformation');

async function getVendor() {
  try {
    const data = await si.cpu();
    debug(`vendor : ${data.vendor}`);
    return data.vendor;
  } catch (e) {
    debug(e);
  }
}

module.exports = getVendor;
