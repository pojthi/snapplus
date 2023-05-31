const mssqlConnPool = require('../../database/DbConnectionPool');
const _activateBrnDbRepo = require('./activateBrn.db');

module.exports = function(router) {

    const activateBrnDbRepo = _activateBrnDbRepo(mssqlConnPool);

    console.log("expose => /saveActivateBrn");
    router.route('/saveActivateBrn').post(activateBrnDbRepo.insertActivateBrn);

    console.log("expose => /getActivateBrn");
    router.route('/getActivateBrn/:macAddr').get(activateBrnDbRepo.getActivateBrn);
}