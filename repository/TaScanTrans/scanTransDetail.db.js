const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand =
    "SELECT SIN.EMP_ID " +
    ",SIN.USERNAME " +
    ",SIN.PIC_IN " +
    ",FORMAT (SIN.SCAN_IN, 'dd-MM-yyyy hh:mm:ss') AS SCAN_IN " +
    ",SOUT.PIC_OUT " +
    ",FORMAT (SOUT.SCAN_OUT, 'dd-MM-yyyy hh:mm:ss') AS SCAN_OUT " +
    "FROM (SELECT TOP 1 EMP_ID " +
    ",USERNAME " +
    ",PIC_URL AS PIC_IN " +
    ",CREATED_DATE AS SCAN_IN " +
    "FROM [DBO].[TA_SCAN_TRANS] " +
    "WHERE EMP_ID = @empId " +
    "AND DIRECTION = 'IN' " +
    "AND CONVERT(DATE, CREATED_DATE) = CONVERT(DATE,@scanDate,105) " +
    "ORDER BY CREATED_DATE ASC " +
    ") SIN  " +
    "LEFT JOIN " +
    "(SELECT TOP 1 EMP_ID " +
    ",USERNAME " +
    ",PIC_URL AS PIC_OUT " +
    ",CREATED_DATE AS SCAN_OUT " +
    "FROM [DBO].[TA_SCAN_TRANS] " +
    "WHERE EMP_ID = @empId " +
    "AND DIRECTION = 'OUT' " +
    "AND CONVERT(DATE, CREATED_DATE) = CONVERT(DATE,@scanDate,105) " +
    "ORDER BY CREATED_DATE DESC" +
    ") SOUT " +
    "ON (SIN.EMP_ID=SOUT.EMP_ID) ";

function ScanTransDetailDAO(mssqlConnPool) {

    async function getScanTransDetail(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;
        try {
            logger.info('getScanTransDetail - sql = ' + sqlCommand);
            logger.info('getScanTransDetail - empId = ' + req.params.empId);
            logger.info('getScanTransDetail - scanDate = ' + req.params.scanDate);

            let result =
                await conn.request()
                .input("empId", sql.VarChar, req.params.empId)
                .input("scanDate", sql.VarChar, req.params.scanDate)
                .query(sqlCommand);

            logger.info('getScanTransDetail - Effect record = ' + result.recordset.length);
            ret= res.json({ success: result.recordset });
        } catch (err) {
            logger.error('getScanTransDetail - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });
        } finally {
            conn.release();
            return ret;
        }
    }

    return {
        getScanTransDetail: getScanTransDetail
    }
}

module.exports = ScanTransDetailDAO;