const mssqlConnPool = require('../../database/DbConnectionPool');
const _roleConfigListDbRepo = require('./roleConfigList.db');

module.exports = function(router) {

    const roleConfigListDbRepo = _roleConfigListDbRepo(mssqlConnPool);

    console.log("expose => /getRoleConfigList");

    router.route('/getRoleConfigList').get(roleConfigListDbRepo.getRoleConfigList);
}