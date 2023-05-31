const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand =
    "INSERT INTO [dbo].[TA_ACTIVATE_BRN]([BRN_CODE],[BRN_NAME],[MAC_ADDR],[LAT],[LOT],[CREATED_DATE],[CREATED_BY]) " +
    "VALUES(@brnCode,@brnName,@macAddr,@lat,@lot,convert(datetime,@createdDate,121),@createdBy) ";

function ActivateBrnDAO(mssqlConnPool) {
    async function insertActivateBrn(req, res) {

        mssqlConnPool.connect().then(function() {

            let transaction = new sql.Transaction(mssqlConnPool);

            transaction.begin().then(function() {

                var request = new sql.Request(transaction);

                var brnCode = req.body.ActivateBrnParam.brnCode;
                var brnName = req.body.ActivateBrnParam.brnName;
                var macAddr = req.body.ActivateBrnParam.macAddr;
                var lat = req.body.ActivateBrnParam.lat;
                var lot = req.body.ActivateBrnParam.lot;
                var createdDate = req.body.ActivateBrnParam.createdDate;
                var createdBy = req.body.ActivateBrnParam.createdBy;

                request.input("brnCode", sql.VarChar, brnCode)
                    .input("brnName", sql.NVarChar, brnName)
                    .input("macAddr", sql.VarChar, macAddr)
                    .input("lat", sql.VarChar, lat)
                    .input("lot", sql.VarChar, lot)
                    .input("createdDate", sql.DateTime, createdDate)
                    .input("createdBy", sql.VarChar, createdBy)
                    .query(sqlCommand)
                    .then(function() {

                        //console.log("sql="+sqlCommand);
                        logger.info('insertActivateBrn - sql ' + sqlCommand);

                        transaction.commit().then(function() {                            
                            //console.log("Insert Complete !!");
                            logger.info('insertActivateBrn - Insert Complete');
                            mssqlConnPool.release();
                            //mssqlConnPool.close();

                            return res.json({ success: 'Insert Complete !!' });
                        }).catch(function(err) {

                            //console.log("Error in Transaction Commit " + err);
                            logger.error('insertActivateBrn - Error : in Transaction Commit ' + err);
                            mssqlConnPool.release();
                            //mssqlConnPool.close();

                            return { err: err };
                        });
                    }).catch(function(err) {
                        logger.error('insertActivateBrn - Error : in Transaction Begin ' + err);
                        //console.log("Error in Transaction Begin " + err);
                        mssqlConnPool.release();
                        //mssqlConnPool.close();

                        return { err: err };
                    });

            }).catch(function(err) {

                console.log(err);
                mssqlConnPool.release();
                //mssqlConnPool.close();

                return { err: err };
            });
        }).catch(function(err) {

            console.log(err);
            mssqlConnPool.release();
            //mssqlConnPool.close();

            return { err: err };
        });
    }

    const query = "SELECT TOP 1 BRN_NAME,BRN_CODE FROM TA_ACTIVATE_BRN WHERE MAC_ADDR=@macAddr ORDER BY CREATED_DATE DESC";

    async function getActivateBrn(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;
        try {
            logger.info('getActivateBrn - macAddr=' + req.params.macAddr);
            let result = await conn.request().input("macAddr", sql.VarChar, req.params.macAddr).query(query);
            
            if (result !== null) {
                if (result.rowsAffected[0] > 0) {  
                    logger.info('getActivateBrn - Effect record =' + result.recordset.length);                  
                    ret =  res.json({ success: result.recordset });    
                }
              } else {
                ret =  res.json({ err: 'No has record.' });
              }   
        } catch (err) {
            logger.error('getActivateBrn - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });            
        } finally {
            conn.release();
            return ret;
        }
    }

    return {
        insertActivateBrn: insertActivateBrn,
        getActivateBrn: getActivateBrn
    }
}

module.exports = ActivateBrnDAO;