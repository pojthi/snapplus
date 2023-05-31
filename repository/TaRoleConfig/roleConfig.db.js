const sql = require('mssql');
const logger = require("../../utility/logger");
const sqlCommand =
    "INSERT INTO [dbo].[TA_ROLE_CONFIG] ([ROLE_CODE],[ROLE_NAME],[CREATED_DATE],[CREATED_BY]) " + 
    " VALUES (@roleCode,@roleName,convert(datetime,@createdDate,121),@createdBy)";

function RoleConfigDAO(mssqlConnPool) {
    async function insertRoleConfig(req, res) {

        mssqlConnPool.connect().then(function() {

            let transaction = new sql.Transaction(mssqlConnPool);

            transaction.begin().then(function() {

                var request = new sql.Request(transaction);
               
                var roleCode = req.body.RoleConfigParam.roleCode;
                var roleName = req.body.RoleConfigParam.roleName;
                var createdDate = req.body.RoleConfigParam.createdDate;
                var createdBy = req.body.RoleConfigParam.createdBy;

                request.input("roleCode", sql.VarChar, roleCode)
                    .input("roleName", sql.NVarChar, roleName)
                    .input("createdDate", sql.DateTime, createdDate)
                    .input("createdBy", sql.VarChar, createdBy)
                    .query(sqlCommand)
                    .then(function() {

                        logger.info('insertRoleConfig - sql = ' + sqlCommand);
                        logger.info('insertRoleConfig - roleCode = ' + req.params.roleCode);
                        logger.info('insertRoleConfig - roleName = ' + req.params.roleName);
                        logger.info('insertRoleConfig - createdDate = ' + req.params.createdDate);
                        logger.info('insertRoleConfig - createdBy = ' + req.params.createdBy);

                        transaction.commit().then(function() {                            
                            logger.info('insertRoleConfig - Insert Complete !!');
                            mssqlConnPool.release();

                            return res.json({ success: 'Insert Complete !!' });
                        }).catch(function(err) {
                            logger.error('insertRoleConfig - Error in Transaction Commit : ' + err);
                            mssqlConnPool.release();

                            return { err: err };
                        });
                    }).catch(function(err) {
                        logger.error('insertRoleConfig - Error in Transaction Begin : ' + err);
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
        insertRoleConfig: insertRoleConfig
    }
}

module.exports = RoleConfigDAO;