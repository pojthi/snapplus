const mssqlConnPool = require('../../database/DbConnectionPool');
const _roleDetailDbRepo = require('./roleDetail.db');

module.exports = function(router) {

    const roleDetailDbRepo = _roleDetailDbRepo(mssqlConnPool);

    console.log("expose => /getRoleByEmpId/:empId");

    router.route('/getRoleByEmpId/:empId').get(roleDetailDbRepo.getRoleByEmpId);
}