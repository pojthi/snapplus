const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand =
    "INSERT INTO [DBO].[TA_SCAN_TRANS]([USERNAME],[DIRECTION],[IP_SOURCE],[QRTIME],[LATITUDE],[LONGTITUDE],[UPDATE_TS],[BRANCH],[BRANCH_LAT],[BRANCH_LONG],[DEVICE_ID],[HASH],[PIC_URL],[EMP_ID],[BRANCH_CODE],[POS_CODE],[POS_CODE_NAME],[CREATED_DATE],[CREATED_BY]) " +
    "VALUES(@userName,@direction,@ipSource,@qrTime,@lat,@lot,@updateTs,@branch,@brnLat,@brnLot,@deviceId,@hash,@picUrl,@empId,@brnCode,@posCode,@posCodeName,convert(datetime,@createdDate,121),@createdBy) ";

function ScanTransDAO(mssqlConnPool) {
    async function insertScanTrans(req, res) {

        mssqlConnPool.connect().then(function() {

            var transaction = new sql.Transaction(mssqlConnPool);

            transaction.begin().then(function() {

                var request = new sql.Request(transaction);

                var userName = req.body.ScanTransParam.userName;
                var direction = req.body.ScanTransParam.direction;
                var ipSource = req.body.ScanTransParam.ipSource;
                var qrTime = req.body.ScanTransParam.qrTime;
                var lat = req.body.ScanTransParam.lat;
                var lot = req.body.ScanTransParam.lot;
                var updateTs = req.body.ScanTransParam.updateTs;
                var branch = req.body.ScanTransParam.branch;
                var brnLat = req.body.ScanTransParam.brnLat;
                var brnLot = req.body.ScanTransParam.brnLot;
                var deviceId = req.body.ScanTransParam.deviceId;
                var hash = req.body.ScanTransParam.hash;
                var picUrl = req.body.ScanTransParam.picUrl;
                var empId = req.body.ScanTransParam.empId;
                var brnCode = req.body.ScanTransParam.brnCode;
                var posCode = req.body.ScanTransParam.posCode;
                var posCodeName = req.body.ScanTransParam.posCodeName;
                var createdDate = req.body.ScanTransParam.createdDate;
                var createdBy = req.body.ScanTransParam.createdBy;

                request.input("userName", sql.NVarChar, userName)
                    .input("direction", sql.VarChar, direction)
                    .input("ipSource", sql.VarChar, ipSource)
                    .input("qrTime", sql.VarChar, qrTime)
                    .input("lat", sql.VarChar, lat)
                    .input("lot", sql.VarChar, lot)
                    .input("updateTs", sql.VarChar, updateTs)
                    .input("branch", sql.NVarChar, branch)
                    .input("brnLat", sql.VarChar, brnLat)
                    .input("brnLot", sql.VarChar, brnLot)
                    .input("deviceId", sql.VarChar, deviceId)
                    .input("hash", sql.VarChar, hash)
                    .input("picUrl", sql.VarChar, picUrl)
                    .input("empId", sql.VarChar, empId)
                    .input("brnCode", sql.VarChar, brnCode)
                    .input("posCode", sql.VarChar, posCode)
                    .input("posCodeName", sql.NVarChar, posCodeName)
                    .input("createdDate", sql.DateTime, createdDate)
                    .input("createdBy", sql.VarChar, createdBy)
                    .query(sqlCommand)
                    .then(function() {

                        logger.info('insertScanTrans - sql = ' + sqlCommand);
                        transaction.commit().then(function() {                           
                            logger.info('insertRole - Insert Complete !!');
                            mssqlConnPool.release();

                            return res.json({ success: "Insert Complete !!" });
                        }).catch(function(err) {
                            logger.error('insertScanTrans - Error in Transaction Commit : ' + err);
                            mssqlConnPool.release();

                            return { err: err };
                        });
                    }).catch(function(err) {
                        logger.error('insertScanTrans - Error in Transaction Begin : ' + err);
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
            return { err: err };
        });
    }

    return {
        insertScanTrans: insertScanTrans
    }
}

module.exports = ScanTransDAO;