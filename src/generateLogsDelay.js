'use strict';

const delay = require('delay');

const logger = require('./logger');

async function generateLogsDelay(db, minutes = 10) {
  while (true) {
    logger(db);
    await delay(minutes * 60 * 1000);
  }
}

module.exports = generateLogsDelay;
