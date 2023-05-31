const mssqlConnPool = require('../../database/DbConnectionPool');
const _scanTransReportDbRepo = require('./scanTransReport.db');

module.exports = function(router) {

    const scanTransReportDbRepo = _scanTransReportDbRepo(mssqlConnPool);
    
    console.log("expose => /getScanTransReport/:empId/:scanFromDate/:scanToDate");

    router.route('/getScanTransReport/:empId/:scanFromDate/:scanToDate').get(scanTransReportDbRepo.getScanTransReport);
}