const sql = require('mssql');
const logger = require("../../utility/logger");

const sqlCommand =
    "INSERT INTO [DBO].[TA_ACTIVITY_LOG]([EMP_ID],[EMP_FULL_NAME_TH],[BRN_CODE],[BRN_CODE_NAME],[POS_CODE],[POS_CODE_NAME],[STAMP_TIME],[FUNCTION],[SNAP_IMG],[LAT],[LOT],[CREATED_DATE],[CREATED_BY],[LOG_MESSAGE]) " +
    "VALUES(@empId,@empFullNameTH,@brnCode,@brnCodeName,@posCode,@posCodeName,@stampTime,@func,@snapImg,@lat,@lot,convert(datetime,@createdDate,121),@createdBy,@logMessage) ";

function ActivityLogDAO(mssqlConnPool) {
    async function insertActivityLog(req, res) {

        mssqlConnPool.connect().then(function() {

            let transaction = new sql.Transaction(mssqlConnPool);

            transaction.begin().then(function() {

                var request = new sql.Request(transaction);

                var empId = req.body.ActivityLogParam.empId;
                var empFullNameTH = req.body.ActivityLogParam.empFullNameTH;
                var brnCode = req.body.ActivityLogParam.brnCode;
                var brnCodeName = req.body.ActivityLogParam.brnCodeName;
                var posCode = req.body.ActivityLogParam.posCode;
                var posCodeName = req.body.ActivityLogParam.posCodeName;
                var stampTime = req.body.ActivityLogParam.stampTime;
                var func = req.body.ActivityLogParam.func;
                var snapImg = req.body.ActivityLogParam.snapImg;
                var lat = req.body.ActivityLogParam.lat;
                var lot = req.body.ActivityLogParam.lot;
                var createdDate = req.body.ActivityLogParam.createdDate;
                var createdBy = req.body.ActivityLogParam.createdBy;
                var logMessage = req.body.ActivityLogParam.logMessage;

                request.input("empId", sql.VarChar, empId)
                    .input("empFullNameTH", sql.NVarChar, empFullNameTH)
                    .input("brnCode", sql.VarChar, brnCode)
                    .input("brnCodeName", sql.NVarChar, brnCodeName)
                    .input("posCode", sql.VarChar, posCode)
                    .input("posCodeName", sql.NVarChar, posCodeName)
                    .input("stampTime", sql.VarChar, stampTime)
                    .input("func", sql.VarChar, func)
                    .input("snapImg", sql.VarChar, snapImg)
                    .input("lat", sql.VarChar, lat)
                    .input("lot", sql.VarChar, lot)
                    .input("createdDate", sql.DateTime, createdDate)
                    .input("createdBy", sql.VarChar, createdBy)
                    .input("logMessage", sql.VarChar, logMessage)
                    .query(sqlCommand)
                    .then(function() {
                        logger.info('insertActivityLog - sql ' + sqlCommand);

                        transaction.commit().then(function() {
                            logger.info('insertActivityLog - Insert Complete !!');
                            mssqlConnPool.release();

                            return res.json({ success: 'Insert Complete !!' });
                        }).catch(function(err) {
                            logger.error('insertActivityLog - Error : in Transaction Commit ' + err);
                            mssqlConnPool.release();

                            return { err: err };
                        });
                    }).catch(function(err) {
                        logger.error('insertActivityLog - Error : in Transaction Begin ' + err);
                        mssqlConnPool.release();

                        return { err: err };
                    });

            }).catch(function(err) {

                console.log(err);
                mssqlConnPool.release();

                return { err: err };
            });
        }).catch(function(err) {

            console.log(err);

            mssqlConnPool.release();

            return { err: err };
        });

    }

    return {
        insertActivityLog: insertActivityLog
    }
}

module.exports = ActivityLogDAO;