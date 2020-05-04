'use strict';

const debug = require('debug')('getMeanTemp');
const Influx = require('influx');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'system_temperatures_db',
  schema: [
    {
      measurement: 'temperatures',
      fields: {
        core1: Influx.FieldType.INTEGER,
        core2: Influx.FieldType.INTEGER,
      },
      tags: ['vendor'],
    },
  ],
});

getMeanTemp(influx, '1h');

function getMeanTemp(db, timeSpan = '1h') {
  db.query(
    `SELECT MEAN(core1), MEAN(core2) FROM temperatures WHERE time > now() - ${timeSpan}`,
  )
    .then((result) => {
      debug(`Average temperature of cores during last ${timeSpan}.`);
      debug(`core 1: ${result[0].mean.toFixed(2)} °C`);
      debug(`core 2: ${result[0].mean_1.toFixed(2)} °C`);

      return result;
    })
    .catch((err) => {
      debug(err);
    });
}

module.exports = getMeanTemp;
