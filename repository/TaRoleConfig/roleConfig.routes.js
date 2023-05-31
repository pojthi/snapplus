const mssqlConnPool = require('../../database/DbConnectionPool');
const _roleConfigDbRepo = require('./roleConfig.db');

module.exports = function(router) {

    const roleConfigDbRepo = _roleConfigDbRepo(mssqlConnPool);

    console.log("expose => /saveRoleConfig");

    router.route('/saveRoleConfig').post(roleConfigDbRepo.insertRoleConfig);
}