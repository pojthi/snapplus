const mssqlConnPool = require('../../database/DbConnectionPool');
const _roleDbRepo = require('./role.db');

module.exports = function(router) {

    const roleDbRepo = _roleDbRepo(mssqlConnPool);

    console.log("expose => /saveRole");

    router.route('/saveRole').post(roleDbRepo.insertRole);
}