const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand =
    " SELECT CONVERT(varchar,CREATED_DATE,120) AS AC_DATE, EMP_ID,SNAP_IMG,[FUNCTION],POS_CODE_NAME, BRN_CODE_NAME " +
    " FROM [dbo].[TA_ACTIVITY_LOG] " +
    " WHERE CONVERT(DATE,CREATED_DATE,105)  " +
    " BETWEEN  CONVERT(DATE,@dateFrom,105) AND CONVERT(DATE,@dateTo,105) AND (SNAP_IMG like '%noimage.png%' Or SNAP_IMG is null) " ;
    
function ActivityLogNoCameraReportDAO(mssqlConnPool) {

    async function getActivityLogNoCameraReport(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;
        try {
            logger.info('getActivityLogNoCameraReport - sql = ' + sqlCommand);
            logger.info('getActivityLogNoCameraReport - dateFrom = ' + req.params.dateFrom);
            logger.info('getActivityLogNoCameraReport - dateTo = ' + req.params.dateTo);

            let result =
                await conn.request()
                .input("dateFrom", sql.VarChar, req.params.dateFrom)
                .input("dateTo", sql.VarChar, req.params.dateTo)
                .query(sqlCommand);

            logger.info('getActivityLogNoCameraReport - Effect record : ' + result.recordset.length);
            ret = res.json({ success: result.recordset });

        } catch (err) {
            logger.error('getActivityLogNoCameraReport - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });            
        } finally {
            conn.release();
            return ret;
        }
    }

    return {
        getActivityLogNoCameraReport: getActivityLogNoCameraReport
    }
}

module.exports = ActivityLogNoCameraReportDAO;