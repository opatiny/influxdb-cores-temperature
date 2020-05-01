'use strict';

const debug = require('debug')('getEntries');

function getLastNEntries(db, measurement, limit = 10) {
  debug(measurement);

  db.query(`select * from ${measurement} order by time desc limit ${limit}`)
    .then((result) => {
      formatResultsDebug(result);
      return result;
    })
    .catch((err) => {
      debug(err);
    });
}

function formatResultsDebug(results) {
  debug('time'.padEnd(19), 'core1', 'core2');
  for (let result of results) {
    debug(result.time.getNanoTime(), `${result.core1}`.padEnd(5), result.core2);
  }
}

module.exports = getLastNEntries;
