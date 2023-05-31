const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand =
    "WITH SET_EMP AS (  " +
    "SELECT TOP 1 EMP_ID,EMP_FULLNAME_TH,POS_CODE,POS_NAME_TH,DEPT_CODE,DEPT_NAME_TH  " +
    "FROM TA_TEMPORARY_STAFF   " +
    "WHERE EMP_ID = @empId AND (CONVERT(DATE,getdate(),105) BETWEEN CONVERT(DATE,START_DATE,105) AND CONVERT(DATE,END_DATE,105))  " +
    "UNION   " +
    "SELECT TOP 1 EMP_ID,EMP_FULLNAME_TH,POS_CODE,POS_NAME_TH,DEPT_CODE,DEPT_NAME_TH  " +
    "FROM TA_EMPLOYEE_BRN   " +
    "WHERE EMP_ID = @empId)  " +
    "SELECT EMP_ID,EMP_FULLNAME_TH,SET_EMP.POS_CODE,POS_NAME_TH,DEPT_CODE,DEPT_NAME_TH,TA_ROLE.ROLE_CODE,TA_ROLE.ROLE_NAME,ISNULL(C.POS_CODE,'ALL') AS PERMISSION  " +
    "FROM SET_EMP LEFT JOIN TA_ROLE  " +
    "ON SET_EMP.POS_CODE=TA_ROLE.POS_CODE " +
    "LEFT JOIN TA_SCAN_CONFIG AS C  " +
    "ON SET_EMP.POS_CODE=C.POS_CODE AND C.ACTIVE='1' ";
	
function EmployeeBrnDetailDAO(mssqlConnPool) {
    async function getEmployeeBrnDetailByEmpId(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;
        try {
            logger.info('getEmployeeBrnDetailByEmpId - sql = ' + sqlCommand);
            logger.info('getEmployeeBrnDetailByEmpId - empId= ' + req.params.empId);

            let result = await conn.request().input("empId", sql.VarChar, req.params.empId).query(sqlCommand);

            logger.info('getEmployeeBrnDetailByEmpId - Effect record = ' + result.recordset.length);
            ret = res.json({ success: result.recordset });
        } catch (err) {
            logger.error('getEmployeeBrnDetailByEmpId - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });
        } finally {
            conn.release();
            return ret;
        }
    }

    return {
        getEmployeeBrnDetailByEmpId: getEmployeeBrnDetailByEmpId
    }
}

module.exports = EmployeeBrnDetailDAO;