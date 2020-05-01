'use strict';

const delay = require('delay');

const logger = require('./logger');

async function generateNLogs(db, numLogs = 100) {
  for (let i = 0; i < numLogs; i++) {
    logger(db);
    await delay(1000);
  }
}

module.exports = generateNLogs;
