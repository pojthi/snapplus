const sql = require('mssql');
const logger = require("../../utility/logger");

var i = 0;
function HealthCheckDAO(mssqlConnPool) {

    async function getHealthCheck(req, res) {
        let sqlCommand = "SELECT getdate() as TA_API";
        const conn = await mssqlConnPool.connect();
        let ret;
        try {            
            console.log("sql=" + sqlCommand);
            let result = await conn.request().query(sqlCommand);
            logger.info('getHealthCheck - Effect record : ' + result.recordset.length);

            if (result.rowsAffected[0] > 0) {                    
                ret =  res.json({ success: result.recordset });    
            } else {
                ret =  res.json({ err: 'No has record.' });
            }   
        } catch (err) {
            logger.error('getHealthCheck - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });
        } finally {
            i +=1;
            console.log('finally : ' + i);
            conn.release();
            return ret;
        }       
    }

    async function checkExportFile(req, res) {
        let sqlCommand = "SELECT top 1 DATEDIFF(hour,GETDATE() ,UPDATE_TS) AS Rec FROM [dbo].[TA_SCAN_TRANS] WHERE UPLOAD_FILE IS NULL AND DATEDIFF(hour,UPDATE_TS,GETDATE() ) > 24";
        const conn = await mssqlConnPool.connect();
        let ret;
        try {            
            console.log("sql=" + sqlCommand);
            let result = await conn.request().query(sqlCommand);
            logger.info('checkExportFile - Effect record : ' + result.recordset.length);
                
            if (result.rowsAffected[0] > 0) {                  
                ret =  res.status(200).send("500");
            }else {
                ret =  res.status(200).send("200");
            }   
        } catch (err) {
            logger.error('checkExportFile - Error : Failed to connect database');
            ret = res.status(500).send("'Failed to connect database' ");
        } finally {
            conn.release();
            return ret;
        }   
    }

    return {
        getHealthCheck: getHealthCheck,
        checkExportFile: checkExportFile
    }
}

module.exports = HealthCheckDAO;