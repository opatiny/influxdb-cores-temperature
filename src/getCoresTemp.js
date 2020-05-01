'use strict';

const debug = require('debug')('cpuTemp');
const si = require('systeminformation');

async function getCoresTemp() {
  try {
    const data = await si.cpuTemperature();
    debug(`CPU Temperatures: ${data.cores}`);
    return data.cores;
  } catch (e) {
    debug(e);
  }
}

module.exports = getCoresTemp;
