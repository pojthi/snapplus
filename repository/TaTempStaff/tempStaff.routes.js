const mssqlConnPool = require('../../database/DbConnectionPool');
const _tempStaffDbRepo = require('./tempStaff.db');

module.exports = function(router) {

    const tempStaffDbRepo = _tempStaffDbRepo(mssqlConnPool);

    console.log("expose => /saveTempStaff");
    router.route('/saveTempStaff').post(tempStaffDbRepo.saveTempStaff);

    console.log("expose => /getTempStaff");
    router.route('/getTempStaff/:EMP_ID').get(tempStaffDbRepo.getTempStaff);

    console.log("expose => /updateTempStaff");
    router.route('/updateTempStaff').post(tempStaffDbRepo.updateTempStaff);

    console.log("expose => /listTempStaff");
    router.route('/listTempStaff/:KEYWORD').get(tempStaffDbRepo.listTempStaff);
}