const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand =
    "SELECT [EMP_ID], [EMP_FULLNAME_TH] " +
    "FROM [DBO].[TA_EMPLOYEE_BRN] " +
    "WHERE [DEPT_CODE] IN (SELECT [DEPT_CODE] FROM [DBO].[TA_EMPLOYEE_UNDER] WHERE EMP_ID = @empId) ";
    
function EmployeeUnderDAO(mssqlConnPool) {

    async function getEmployeeUnderByEmpId(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;        
        try {
            logger.info('getEmployeeUnderByEmpId - sql = ' + sqlCommand);
            logger.info('getEmployeeUnderByEmpId - empId= ' + req.params.empId);

            let result =
                await conn.request()
                .input("empId", sql.NVarChar, req.params.empId)
                .query(sqlCommand);

            logger.info('getEmployeeUnderByEmpId - Effect record = ' + result.recordset.length);

            ret= res.json({ success: result.recordset });

        } catch (err) {
            logger.error('getEmployeeUnderByEmpId - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });        
        } finally {
           conn.release();
           return ret;
        }

    }

    return {
        getEmployeeUnderByEmpId: getEmployeeUnderByEmpId
    }
}

module.exports = EmployeeUnderDAO;