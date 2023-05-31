const mssqlConnPool = require('../../database/DbConnectionPool');
const _employeeBrnDbRepo = require('./employeeBrn.db');

module.exports = function(router) {

    const employeeBrnDetailDbRepo = _employeeBrnDbRepo(mssqlConnPool);

    console.log("expose => /getEmployeeBrnDetailByEmpId/:empId");

    router.route('/getEmployeeBrnDetailByEmpId/:empId').get(employeeBrnDetailDbRepo.getEmployeeBrnDetailByEmpId);
}