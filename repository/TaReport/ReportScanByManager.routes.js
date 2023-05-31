const mssqlConnPool = require('../../database/DbConnectionPool');
const _reportScanByManagerDbRepo = require('./ReportScanByManager.db');

module.exports = function(router) {

    const reportScanByManagerDbRepo = _reportScanByManagerDbRepo(mssqlConnPool);
    
    console.log("expose => /getReportScanByManagerId/:empId/:fromDate/:toDate");

    router.route('/getReportScanByManagerId/:empId/:fromDate/:toDate').get(reportScanByManagerDbRepo.getReportScanByManagerId);
}