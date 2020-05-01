'use strict';

const debug = require('debug')('index');
const Influx = require('influx');

const generateNLogs = require('./generateNLogs');
const getLastNEntries = require('./getLastNEntries');

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

getLastNEntries(influx, 'temperatures');

influx
  .getDatabaseNames()
  .then((names) => {
    if (!names.includes('system_temperatures_db')) {
      return influx.createDatabase('system_temperatures_db');
    }
  })
  .then(() => {
    debug('Writing temperatures of 100 next seconds to database');
    generateNLogs(influx, 1);
  })
  .catch((e) => {
    debug(`Error creating Influx database!`);
    debug(e);
  });
