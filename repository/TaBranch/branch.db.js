const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand = "SELECT [BRN_CODE], [BRN_NAME] FROM [DBO].[TA_BRANCH] WHERE BRN_NAME LIKE @brnName ";

function BranchDAO(mssqlConnPool) {
    async function findBranchByNameList(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;        
        try {
            logger.info('findBranchByNameList - sql = ' + sqlCommand);
            logger.info('findBranchByNameList - brnName= ' + req.params.brnName);
            let result =
                await conn.request()
                .input("brnName", sql.NVarChar, "%" + req.params.brnName + "%")
                .query(sqlCommand);

            logger.info('findBranchByNameList - Effect record = ' + result.recordset.length);

            ret = res.json({ success: result.recordset });
        } catch (err) {
            logger.error('findBranchByNameList - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });            
        } finally {
           conn.release();
           return ret;
        }
    }

    return {
        findBranchByNameList: findBranchByNameList
    }
}

module.exports = BranchDAO;