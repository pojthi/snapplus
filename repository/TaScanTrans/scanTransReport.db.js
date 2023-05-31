const sql = require('mssql');
const logger = require("../../utility/logger");

const sqlCommand ="SELECT CONVERT(DATE,CREATED_DATE,105) AS SCAN_DATE,QRTIME,EMP_ID,USERNAME,DIRECTION,PIC_URL,BRANCH,LATITUDE,LONGTITUDE " +
    " FROM [DBO].[TA_SCAN_TRANS] " +
    " WHERE EMP_ID=@empId " +
    " AND  CONVERT(DATE, CREATED_DATE) BETWEEN CONVERT(DATE,@scanFromDate,105) AND CONVERT(DATE,@scanToDate,105) " +
    " ORDER BY CREATED_DATE ";
    
function ScanTransReportDAO(mssqlConnPool) {

    async function getScanTransReport(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;
        try {
            logger.info('getScanTransReport - sql = ' + sqlCommand);
            logger.info('getScanTransReport - empId = ' + req.params.empId);
            logger.info('getScanTransReport - FromDate = ' + req.params.scanFromDate);
            logger.info('getScanTransReport - ToDate = ' + req.params.scanToDate);

            let result =
                await conn.request()
                .input("empId", sql.VarChar, req.params.empId)
                .input("scanFromDate", sql.VarChar, req.params.scanFromDate)
                .input("scanToDate", sql.VarChar, req.params.scanToDate)
                .query(sqlCommand);

            logger.info('getScanTransReport - Effect record = ' + result.recordset.length);
            ret= res.json({ success: result.recordset });
        } catch (err) {
            logger.error('getScanTransReport - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });
        } finally {
           conn.release();
           return ret;
        }
    }

    return {
        getScanTransReport: getScanTransReport
    }
}

module.exports = ScanTransReportDAO;