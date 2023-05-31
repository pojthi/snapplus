const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand =
    "SELECT R.POS_CODE, R.ROLE_CODE  " +
    "FROM [dbo].[TA_EMPLOYEE_BRN] AS E " +
    "INNER JOIN [dbo].[TA_ROLE] AS R " +
    "ON E.POS_CODE = R.POS_CODE " +
    "WHERE EMP_ID=@empId " 

function RoleDetailDAO(mssqlConnPool) {

    async function getRoleByEmpId(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;         
        try {
            logger.info('getRoleByEmpId - sql = ' + sqlCommand);
            logger.info('getRoleByEmpId - empId = ' + req.params.empId);

            let result = await conn.request().input("empId", sql.NVarChar, req.params.empId).query(sqlCommand);

            logger.info('getRoleByEmpId - Effect record = ' + result.recordset.length);
            ret = res.json({ success: result.recordset });
        } catch (err) {
            logger.error('getRoleByEmpId - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });   
        } finally {
            conn.release();
            return ret;
        }
    }

    return {
        getRoleByEmpId: getRoleByEmpId
    }
}

module.exports = RoleDetailDAO;