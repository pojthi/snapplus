const mssqlConnPool = require('../../database/DbConnectionPool');
const _employeePosDbRepo = require('./employeePos.db');

module.exports = function(router) {

    const employeePosDbRepo = _employeePosDbRepo(mssqlConnPool);

    console.log("expose => /findEmployeePosByPosCode/:posCode");

    router.route('/findEmployeePosByPosCode/:posCode').get(employeePosDbRepo.findEmployeePosByPosCode);

    console.log("expose => /findEmployeePosByPosName");
    router.route('/findEmployeePosByPosName/:posName').get(employeePosDbRepo.findEmployeePosByPosName);
}