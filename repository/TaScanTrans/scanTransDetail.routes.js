const mssqlConnPool = require('../../database/DbConnectionPool');
const _scanTransDetailDbRepo = require('./scanTransDetail.db');

module.exports = function(router) {

    const scanTransDetailDbRepo = _scanTransDetailDbRepo(mssqlConnPool);

    console.log("expose => /getScanTransDetail/:empId/:scanDate");

    router.route('/getScanTransDetail/:empId/:scanDate').get(scanTransDetailDbRepo.getScanTransDetail);
}