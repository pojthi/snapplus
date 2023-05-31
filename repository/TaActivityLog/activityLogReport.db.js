const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand =
    " SELECT CONVERT(varchar,CREATED_DATE,120) AS AC_DATE, EMP_ID,SNAP_IMG,[FUNCTION],POS_CODE_NAME " +
    " FROM [dbo].[TA_ACTIVITY_LOG] " +
    " WHERE EMP_ID = @empId " +
    " AND  CONVERT(DATE,CREATED_DATE,105)  " +
    " BETWEEN  CONVERT(DATE,@dateFrom,105) AND CONVERT(DATE,@dateTo,105) " ;
    
function ActivityLogReportDAO(mssqlConnPool) {

    async function getActivityLogReport(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;
        try {
            logger.info('getActivityLogReport - sql = ' + sqlCommand);
            logger.info('getActivityLogReport - empId = ' + req.params.empId);
            logger.info('getActivityLogReport - dateFrom = ' + req.params.dateFrom);
            logger.info('getActivityLogReport - dateTo = ' + req.params.dateTo);

            let result =
                await conn.request()
                .input("empId", sql.VarChar, req.params.empId)
                .input("dateFrom", sql.VarChar, req.params.dateFrom)
                .input("dateTo", sql.VarChar, req.params.dateTo)
                .query(sqlCommand);

            logger.info('getActivityLogReport - Effect record = ' + result.recordset.length);

            ret = res.json({ success: result.recordset });

        } catch (err) {
            logger.error('getActivityLogReport - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });
        } finally {
            conn.release();
            return ret;
        }
    }

    return {
        getActivityLogReport: getActivityLogReport
    }
}

module.exports = ActivityLogReportDAO;