# influxdb-cores-temperature

Try learn InfluxDB by storing system information in a database.

## Database

The database is created in InfluxDB. The server must be running locally on port 8086 for `index.js` to work.

## `index.js`

Every time `index.js` is run, the last 10 entries of the database are printed in the debug and a new log is added to the database. Each log contains the temperature of (the) two cores of the computer you work on.

A script has been made so that you do not have to remember how to run the script. Just use:

```bash
npm start
```

## Dependencies

- `influx`: To write to the local database
- `systeminformation`: To have information about the state of the computer
- `debug`: To have nice messages in the console
- `delay`: We want to put delays in the code to have a certain time span between entries in the db
