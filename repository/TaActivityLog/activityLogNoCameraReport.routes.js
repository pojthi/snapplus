const mssqlConnPool = require('../../database/DbConnectionPool');
const _activityLogNoCameraReportDbRepo = require('./activityLogNoCameraReport.db');

module.exports = function(router) {

    const activityLogNoCameraReportDbRepo = _activityLogNoCameraReportDbRepo(mssqlConnPool);
    
    console.log("expose => /getActivityLogNoCameraReport/:dateFrom/:dateTo");

    router.route('/getActivityLogNoCameraReport/:dateFrom/:dateTo').get(activityLogNoCameraReportDbRepo.getActivityLogNoCameraReport);
}