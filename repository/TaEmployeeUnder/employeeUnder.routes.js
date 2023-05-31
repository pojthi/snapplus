const mssqlConnPool = require('../../database/DbConnectionPool');
const _employeeUnderDbRepo = require('./employeeUnder.db');

module.exports = function(router) {

    const employeeUnderDbRepo = _employeeUnderDbRepo(mssqlConnPool);

    console.log("expose => /getEmployeeUnderByEmpId/:empId");

    router.route('/getEmployeeUnderByEmpId/:empId').get(employeeUnderDbRepo.getEmployeeUnderByEmpId);
}