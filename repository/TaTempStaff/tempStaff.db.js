const sql = require('mssql');
const logger = require("../../utility/logger");
const saveCommand =
    "INSERT INTO [dbo].[TA_TEMPORARY_STAFF] ([EMP_ID],[EMP_FULLNAME_TH],[POS_CODE],[POS_NAME_TH] " + 
    ",[DEPT_CODE],[DEPT_NAME_TH],[START_DATE],[END_DATE],[CREATED_DATE],[CREATED_BY]) VALUES " +
    "(@EMP_ID,@EMP_FULLNAME_TH,@POS_CODE,@POS_NAME_TH, " +
    "@DEPT_CODE,@DEPT_NAME_TH,convert(datetime,@START_DATE,105),convert(datetime,@END_DATE,105),GETDATE(),'System')";
   
function TempStaffDAO(mssqlConnPool) {
    async function saveTempStaff(req, res) {

        mssqlConnPool.connect().then(function() {

            let transaction = new sql.Transaction(mssqlConnPool);

            transaction.begin().then(function() {

                var request = new sql.Request(transaction);

                var EMP_ID = req.body.TempStaffParam.EMP_ID;
                var EMP_FULLNAME_TH = req.body.TempStaffParam.EMP_FULLNAME_TH;
                var POS_CODE = req.body.TempStaffParam.POS_CODE;
                var POS_NAME_TH = req.body.TempStaffParam.POS_NAME_TH;
                var DEPT_CODE = req.body.TempStaffParam.DEPT_CODE;
                var DEPT_NAME_TH = req.body.TempStaffParam.DEPT_NAME_TH;
                var START_DATE = req.body.TempStaffParam.START_DATE;
                var END_DATE = req.body.TempStaffParam.END_DATE;

                request.input("EMP_ID", sql.VarChar, EMP_ID)
                    .input("EMP_FULLNAME_TH", sql.NVarChar, EMP_FULLNAME_TH)
                    .input("POS_CODE", sql.VarChar, POS_CODE)
                    .input("POS_NAME_TH", sql.NVarChar, POS_NAME_TH)
                    .input("DEPT_CODE", sql.VarChar, DEPT_CODE)
                    .input("DEPT_NAME_TH", sql.NVarChar, DEPT_NAME_TH)
                    .input("START_DATE", sql.VarChar, START_DATE)
                    .input("END_DATE", sql.VarChar, END_DATE)
                    .query(saveCommand)
                    .then(function() {

                        logger.info('saveTempStaff - sql ' + saveCommand);

                        transaction.commit().then(function() {                            
                            logger.info('saveTempStaff - Insert Complete');
                            mssqlConnPool.release();

                            return res.json({ success: 'Insert Complete !!' });
                        }).catch(function(err) {
                            logger.error('saveTempStaff - Error : in Transaction Commit ' + err);
                            mssqlConnPool.release();

                            return { err: err };
                        });
                    }).catch(function(err) {
                        logger.error('saveTempStaff - Error : in Transaction Begin ' + err);
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

    const getCommand = "SELECT EMP_ID,EMP_FULLNAME_TH,POS_CODE,POS_NAME_TH,DEPT_CODE,DEPT_NAME_TH,FORMAT (START_DATE,'dd-MM-yyyy') AS START_DATE,FORMAT (END_DATE,'dd-MM-yyyy') AS END_DATE FROM TA_TEMPORARY_STAFF WHERE EMP_ID=@EMP_ID";

    async function getTempStaff(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;        
        try {
            logger.info('getTempStaff - EMP_ID=' + req.params.EMP_ID);
            let result =
                await conn.request()
                .input("EMP_ID", sql.VarChar, req.params.EMP_ID)
                .query(getCommand);

            logger.info('getTempStaff - Effect record =' + result.recordset.length);
            ret = res.json({ success: result.recordset });
        } catch (err) {
            logger.error('getTempStaff - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });
        } finally {
            conn.release();
            return ret;
        }
    }

    const updateCommand = "UPDATE [dbo].[TA_TEMPORARY_STAFF] SET " +
    "[EMP_FULLNAME_TH] = @EMP_FULLNAME_TH,[POS_CODE] = @POS_CODE,[POS_NAME_TH] = @POS_NAME_TH " +
    ",[DEPT_CODE] = @DEPT_CODE,[DEPT_NAME_TH] = @DEPT_NAME_TH,[START_DATE] = convert(datetime,@START_DATE,105) " +
    ",[END_DATE] = convert(datetime,@END_DATE,105),[UPDATED_DATE] = GETDATE(),[UPDATED_BY] = 'System' " +
    " WHERE [EMP_ID] = @EMP_ID";

    async function updateTempStaff(req, res) {
        mssqlConnPool.connect().then(function() {

            let transaction = new sql.Transaction(mssqlConnPool);

            transaction.begin().then(function() {

                var request = new sql.Request(transaction);

                var EMP_ID = req.body.TempStaffParam.EMP_ID;
                var EMP_FULLNAME_TH = req.body.TempStaffParam.EMP_FULLNAME_TH;
                var POS_CODE = req.body.TempStaffParam.POS_CODE;
                var POS_NAME_TH = req.body.TempStaffParam.POS_NAME_TH;
                var DEPT_CODE = req.body.TempStaffParam.DEPT_CODE;
                var DEPT_NAME_TH = req.body.TempStaffParam.DEPT_NAME_TH;
                var START_DATE = req.body.TempStaffParam.START_DATE;
                var END_DATE = req.body.TempStaffParam.END_DATE;

                request.input("EMP_ID", sql.VarChar, EMP_ID)
                    .input("EMP_FULLNAME_TH", sql.NVarChar, EMP_FULLNAME_TH)
                    .input("POS_CODE", sql.VarChar, POS_CODE)
                    .input("POS_NAME_TH", sql.NVarChar, POS_NAME_TH)
                    .input("DEPT_CODE", sql.VarChar, DEPT_CODE)
                    .input("DEPT_NAME_TH", sql.NVarChar, DEPT_NAME_TH)
                    .input("START_DATE", sql.VarChar, START_DATE)
                    .input("END_DATE", sql.VarChar, END_DATE)
                    .query(updateCommand)
                    .then(function() {

                        logger.info('updateTempStaff - sql ' + updateCommand);

                        transaction.commit().then(function() {                            
                            logger.info('updateTempStaff - Update Complete');
                            mssqlConnPool.release();

                            return res.json({ success: 'Update Complete !!' });
                        }).catch(function(err) {
                            logger.error('updateTempStaff - Error : in Transaction Commit ' + err);
                            mssqlConnPool.release();

                            return { err: err };
                        });
                    }).catch(function(err) {
                        logger.error('updateTempStaff - Error : in Transaction Begin ' + err);
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

    const searchCommand = "SELECT EMP_ID,EMP_FULLNAME_TH,POS_CODE,POS_NAME_TH,DEPT_CODE,DEPT_NAME_TH,CONVERT(DATE,START_DATE,105) AS START_DATE,CONVERT(DATE,END_DATE,105) AS END_DATE FROM TA_TEMPORARY_STAFF WHERE (EMP_ID like @KEYWORD) OR (EMP_FULLNAME_TH like @KEYWORD) ORDER BY EMP_ID";

    async function listTempStaff(req, res) {
        const conn = await mssqlConnPool.connect();
        let ret;           
        try {
            logger.info('listTempStaff - KEYWORD=' + req.params.KEYWORD);
 
            let keyword = req.params.KEYWORD;
            if (keyword=='ALL') keyword ="";

            let result =
                await conn.request()
                .input("KEYWORD", sql.NVarChar, "%" + keyword + "%")
                .query(searchCommand);

            logger.info('listTempStaff - Effect record =' + result.recordset.length);
            ret= res.json({ success: result.recordset });
        } catch (err) {
            logger.error('listTempStaff - Error : Failed to connect database');
            ret = res.json({ err: 'Failed to connect database' });
        } finally {
            conn.release();
            return ret;
        }
    }

    return {
        saveTempStaff: saveTempStaff,
        getTempStaff: getTempStaff,
        updateTempStaff: updateTempStaff,
        listTempStaff: listTempStaff
    }
}

module.exports = TempStaffDAO;