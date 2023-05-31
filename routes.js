const express = require('express');

function eRoutes() {
    const router = express.Router();
    var ldap = require('./repository/Ldap/authen.routes')(router);
    var branch = require('./repository/TaBranch/branch.routes')(router);
    var employeeBrnDetail = require('./repository/TaEmployeeBrn/employeeBrn.routes')(router);
    var employeePos = require('./repository/TaEmployeePos/employeePos.routes')(router);
    var employeeUnder = require('./repository/TaEmployeeUnder/employeeUnder.routes')(router);
    var scanTrans = require('./repository/TaScanTrans/scanTrans.routes')(router);
    var scanTransDetail = require('./repository/TaScanTrans/scanTransDetail.routes')(router);
    var activityLog = require('./repository/TaActivityLog/activityLog.routes')(router);
    var activateBrn = require('./repository/TaActivateBrn/activateBrn.routes')(router);
    var saveRole = require('./repository/TaRole/role.routes')(router);
    var scanTransReport = require('./repository/TaScanTrans/scanTransReport.routes')(router);
    var activityLogReport = require('./repository/TaActivityLog/activityLogReport.routes')(router);
    var activityLogNoCameraReport = require('./repository/TaActivityLog/activityLogNoCameraReport.routes')(router);
    var roleConfig = require('./repository/TaRoleConfig/roleConfig.routes')(router);
    var roleConfigList = require('./repository/TaRoleConfig/roleConfigList.routes')(router);
    var roleDetail = require('./repository/TaRole/roleDetail.routes')(router);
    var healthCheck = require('./repository/HealthCheck/healthCheck.routes')(router);
    var reportScanByEmployeeId = require('./repository/TaReport/ReportScanByEmployee.routes')(router);
    var reportScanByManagerId = require('./repository/TaReport/ReportScanByManager.routes')(router);

    var saveTempStaff = require('./repository/TaTempStaff/tempStaff.routes')(router);

    return router;
}

module.exports = eRoutes;