const mssqlConnPool = require('../../database/DbConnectionPool');
const _activityLogReportDbRepo = require('./activityLogReport.db');

module.exports = function(router) {

    const activityLogReportDbRepo = _activityLogReportDbRepo(mssqlConnPool);
    
    console.log("expose => /getActivityLogReport/:empId/:dateFrom/:dateTo");

    router.route('/getActivityLogReport/:empId/:dateFrom/:dateTo').get(activityLogReportDbRepo.getActivityLogReport);
}