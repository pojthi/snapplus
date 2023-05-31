const mssqlConnPool = require('../../database/DbConnectionPool');
const _scanTransDbRepo = require('./scanTrans.db');

module.exports = function(router) {

    const scanTransDbRepo = _scanTransDbRepo(mssqlConnPool);

    console.log("expose => /saveScanTrans");

    router.route('/saveScanTrans').post(scanTransDbRepo.insertScanTrans);
}