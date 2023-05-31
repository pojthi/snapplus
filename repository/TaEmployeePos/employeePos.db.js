const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand = "SELECT [CODPOS], [NAMPOST], [NAMPOSE] FROM [DBO].[TA_EMPLOYEE_POS] WHERE [CODPOS] LIKE @posCode ";

function EmployeePosDAO(mssqlConnPool) {

    async function findEmployeePosByPosCode(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;
        try {            
            logger.info('findEmployeePosByPosCode - sql = ' + sqlCommand);
            logger.info('findEmployeePosByPosCode - posCode= ' + req.params.posCode);

            let result =await conn.request().input("posCode", sql.NVarChar, req.params.posCode + "%").query(sqlCommand);

            logger.info('findEmployeePosByPosCode - Effect record = ' + result.recordset.length);

            ret = res.json({ success: result.recordset });
        } catch (err) {
            logger.error('findEmployeePosByPosCode - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });            
        } finally {
            conn.release();
            return ret;
        }
    }

    const searchCommand = "SELECT [CODPOS], [NAMPOST], [NAMPOSE] FROM [DBO].[TA_EMPLOYEE_POS] WHERE [NAMPOST] LIKE @posName ";

    async function findEmployeePosByPosName(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;        
        try {
            logger.info('findEmployeePosByPosName - posName=' + req.params.posName);

            let posName = req.params.posName;
            let result =await conn.request().input("posName", sql.NVarChar, "%" + req.params.posName + "%").query(searchCommand);

            logger.info('findEmployeePosByPosName - Effect record =' + result.recordset.length);
            ret = res.json({ success: result.recordset });
        } catch (err) {
            logger.error('findEmployeePosByPosName - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });              
        } finally {
            conn.release();
            return ret;
        }
    }

    return {
        findEmployeePosByPosCode: findEmployeePosByPosCode,
        findEmployeePosByPosName: findEmployeePosByPosName
    }
}

module.exports = EmployeePosDAO;