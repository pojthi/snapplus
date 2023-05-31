const mssqlConnPool = require('../../database/DbConnectionPool');
const _activityLogDbRepo = require('./activityLog.db');

module.exports = function(router) {

    const activityLogDbRepo = _activityLogDbRepo(mssqlConnPool);

    console.log("expose => /saveActivityLog");

    router.route('/saveActivityLog').post(activityLogDbRepo.insertActivityLog);
}