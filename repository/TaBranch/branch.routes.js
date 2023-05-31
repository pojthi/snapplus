const mssqlConnPool = require('../../database/DbConnectionPool');
const _brnDbRepo = require('./branch.db');

module.exports = function(router) {

    const brnDbRepo = _brnDbRepo(mssqlConnPool);

    console.log("expose => /findBranchByNameList/:brnName");

    router.route('/findBranchByNameList/:brnName').get(brnDbRepo.findBranchByNameList);
}