const sql = require('mssql');
var config = require('../config/config');

var dbConfig = config.dbConnectionString;
const logger = require("../utility/logger");


const mssqlConnPool = new sql.ConnectionPool(dbConfig);

mssqlConnPool.on('error', err => {
    logger.error("dbConnectionString - SQL Server Initial Connection Pool Error : " + err);
});


module.exports = mssqlConnPool;