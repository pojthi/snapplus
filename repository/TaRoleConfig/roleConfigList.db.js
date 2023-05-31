const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand = "SELECT [ROLE_CODE],[ROLE_NAME] FROM [dbo].[TA_ROLE_CONFIG]";

function RoleConfigListDAO(mssqlConnPool) {

    async function getRoleConfigList(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;   
        try {            
            logger.info('getRoleConfigList - sql = ' + sqlCommand);
            let result = await conn.request().query(sqlCommand);

            logger.info('getRoleConfigList - Effect record = ' + result.recordset.length);
            ret = res.json({ success: result.recordset });
        } catch (err) {
            logger.error('getRoleConfigList - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });   
        } finally {
            conn.release();
           return ret;
        }
    }

    return {
        getRoleConfigList: getRoleConfigList
    }
}

module.exports = RoleConfigListDAO;