const sql = require('mssql');
const logger = require("../../utility/logger");

const sqlCommand ="SELECT BRANCH,EMP_ID,USERNAME,POS_CODE_NAME,DIRECTION,QRTIME,PIC_URL " +
"FROM [dbo].[TA_SCAN_TRANS] " +
"WHERE CONVERT(DATE, QRTIME) BETWEEN " +
"CONVERT(DATE,@fromDate,105) AND CONVERT(DATE,@toDate,105) " +
"AND EMP_ID = @empId " +
"ORDER BY BRANCH,EMP_ID,USERNAME,POS_CODE_NAME,QRTIME ";

function ReportScanByEmployeeDAO(mssqlConnPool) {

    async function getReportScanByEmployeeId(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;      
        try {
            logger.info('getReportScanByEmployeeId - sql = ' + sqlCommand);
            logger.info('getReportScanByEmployeeId - empId = ' + req.params.empId);
            logger.info('getReportScanByEmployeeId - fromDate = ' + req.params.fromDate);
            logger.info('getReportScanByEmployeeId - toDate = ' + req.params.toDate);
            let result =
                await conn.request()
                .input("empId", sql.VarChar, req.params.empId)
                .input("fromDate", sql.VarChar, req.params.fromDate)
                .input("toDate", sql.VarChar, req.params.toDate)
                .query(sqlCommand);

    
            logger.info('getReportScanByEmployeeId - Effect record = ' + result.recordset.length);

            ret= res.json({ success: result.recordset });

        } catch (err) {
            logger.error('getReportScanByEmployeeId - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });   
        } finally {
            conn.release();
            return ret;
        }
    }

    return {
        getReportScanByEmployeeId: getReportScanByEmployeeId
    }
}

module.exports = ReportScanByEmployeeDAO;