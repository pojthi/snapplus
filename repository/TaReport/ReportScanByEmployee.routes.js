const mssqlConnPool = require('../../database/DbConnectionPool');
const _reportScanByEmployeeDbRepo = require('./ReportScanByEmployee.db');

module.exports = function(router) {

    const reportScanByEmployeeDbRepo = _reportScanByEmployeeDbRepo(mssqlConnPool);
    
    console.log("expose => /getReportScanByEmployeeId/:empId/:fromDate/:toDate");

    router.route('/getReportScanByEmployeeId/:empId/:fromDate/:toDate').get(reportScanByEmployeeDbRepo.getReportScanByEmployeeId);
}