const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand =
    "INSERT INTO [dbo].[TA_ROLE]([ROLE_CODE],[ROLE_NAME],[POS_CODE],[CREATED_DATE],[CREATED_BY]) " +
    "VALUES (@roleCode,@roleName,@posCode,convert(datetime,@createdDate,121),@createdBy) ";

function RoleDAO(mssqlConnPool) {
    async function insertRole(req, res) {

        mssqlConnPool.connect().then(function() {

            let transaction = new sql.Transaction(mssqlConnPool);

            transaction.begin().then(function() {

                var request = new sql.Request(transaction);

                var roleCode = req.body.RoleParam.roleCode;
                var roleName = req.body.RoleParam.roleName;
                var posCode = req.body.RoleParam.posCode;
                var createdDate = req.body.RoleParam.createdDate;
                var createdBy = req.body.RoleParam.createdBy;

                request.input("roleCode", sql.VarChar, roleCode)
                    .input("roleName", sql.NVarChar, roleName)
                    .input("posCode", sql.VarChar, posCode)
                    .input("createdDate", sql.DateTime, createdDate)
                    .input("createdBy", sql.VarChar, createdBy)
                    .query(sqlCommand)
                    .then(function() {

                        logger.info('insertRole - sql = ' + sqlCommand);
                        logger.info('insertRole - roleCode = ' + req.params.roleCode);
                        logger.info('insertRole - roleName = ' + req.params.roleName);
                        logger.info('insertRole - posCode = ' + req.params.posCode);
                        logger.info('insertRole - createdDate = ' + req.params.createdDate);
                        logger.info('insertRole - createdBy = ' + req.params.createdBy);

                        transaction.commit().then(function() {                            
                            logger.info('insertRole - Insert Complete !!');
                            mssqlConnPool.release();

                            return res.json({ success: 'Insert Complete !!' });
                        }).catch(function(err) {
                            logger.error('insertRole - Error in Transaction Commit : ' + err);
                            mssqlConnPool.release();

                            return { err: err };
                        });
                    }).catch(function(err) {
                        logger.error('insertRole - Error in Transaction Begin : ' + err);
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
        insertRole: insertRole
    }
}

module.exports = RoleDAO;