const sql = require('mssql');
const logger = require("../../utility/logger");

const sqlCommand ="SELECT BRANCH,EMP_ID,USERNAME,POS_CODE_NAME,DIRECTION,QRTIME,PIC_URL " +
"FROM [dbo].[TA_SCAN_TRANS] " +
"WHERE CONVERT(DATE, QRTIME) BETWEEN " +
"CONVERT(DATE,@fromDate,105) AND CONVERT(DATE,@toDate,105) " +
"AND EMP_ID IN (SELECT EMP_ID " +
"FROM [dbo].[TA_EMPLOYEE_BRN] " +
"WHERE DEPT_CODE IN (SELECT DEPT_CODE FROM [DBO].[TA_EMPLOYEE_UNDER] WHERE EMP_ID = @empId))" +
"ORDER BY BRANCH,EMP_ID,USERNAME,POS_CODE_NAME,QRTIME ";

function ReportScanByManagerDAO(mssqlConnPool) {

    async function getReportScanByManagerId(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;  
        try {
            logger.info('getReportScanByManagerId - sql = ' + sqlCommand);
            logger.info('getReportScanByManagerId - empId = ' + req.params.empId);
            logger.info('getReportScanByManagerId - FromDate = ' + req.params.fromDate);
            logger.info('getReportScanByManagerId - ToDate = ' + req.params.toDate);

            let result =
                await conn.request()
                .input("empId", sql.VarChar, req.params.empId)
                .input("fromDate", sql.VarChar, req.params.fromDate)
                .input("toDate", sql.VarChar, req.params.toDate)
                .query(sqlCommand);

            logger.info('getReportScanByManagerId - Effect record = ' + result.recordset.length);

            ret = res.json({ success: result.recordset });
        } catch (err) {
            logger.error('getReportScanByManagerId - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });   
        } finally {
           conn.release();
           return ret;
        }
    }

    return {
        getReportScanByManagerId: getReportScanByManagerId
    }
}

module.exports = ReportScanByManagerDAO;