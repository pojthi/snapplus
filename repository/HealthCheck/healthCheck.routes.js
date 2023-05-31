const mssqlConnPool = require('../../database/DbConnectionPool');
const _healthCheckDbRepo = require('./healthCheck.db');

module.exports = function(router) {

    const healthCheckDbRepo = _healthCheckDbRepo(mssqlConnPool);

    console.log("expose => /getHealthCheck");
    router.route('/getHealthCheck').get(healthCheckDbRepo.getHealthCheck);

    console.log("expose => /checkExportFile");
    router.route('/checkExportFile').get(healthCheckDbRepo.checkExportFile);    
}