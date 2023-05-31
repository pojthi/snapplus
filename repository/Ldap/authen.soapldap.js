const sql = require('mssql');
const configs = require('../../config/config');
const logger = require("../../utility/logger");
var soap = require('soap');
const sqlCommand = "SELECT TOP 1 EMP_ID as uid,EMP_FULLNAME_TH as cn FROM TA_EMPLOYEE_BRN WHERE EMP_ID = @empId ";

function AuthenSoapLDapDAO(mssqlConnPool) {

    function authenticate(username, pwd) {
        var args = { userID: username, password: pwd };
    
        return new Promise((resolve, reject) => {
            logger.info("Begin | LDAP Authentication process");
            logger.info('Search LDAP - userName => ' + username);
            logger.info('Search LDAP - password => ********');
            
            soap.createClient(configs.ldap.soap_wdsl, function (err, client) {
                client.addHttpHeader(configs.ldap.soap_hd, configs.ldap.soap_hd_key);
                client.setEndpoint(configs.ldap.soap_endpoint);
                client.LDAP_HRIS_USER_AUTHEN2(args, function (err, result) {
                    let jsonStr = JSON.stringify(result);
                    var jsonObj = JSON.parse(jsonStr);
    
                    logger.info('Result: \n' + JSON.stringify(result));
    
                    if ((JSON.parse(jsonObj.LDAP_HRIS_USER_AUTHEN2Result).isSuccessful) == true) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
    
                });
            });
            logger.info("End | LDAP Authentication process");
        })
    }
    
    async function login(req, res) {
        var ret = {};
        try {
            let userName = req.body.AuthenParam.userName;
            let password = req.body.AuthenParam.password;
         
            let result = await authenticate(userName, password);      
            if (result) {         
                ret = await getProfile(userName);
            } else {
                ret = { error: err };
            }
        }
        catch (err) {
            logger.error('Login Process have error : ' + err);
            ret = { error: err };
        }
        finally {
            logger.info("End | Login Process");
            return res.json(ret);
        }    
    }
    
    async function getProfile(empId) {
        const conn = await mssqlConnPool.connect();
        let ret;
        try {
            logger.info('getProfile - sql = ' + sqlCommand);
            logger.info('getProfile - empId= ' + empId);
    
            let result = await conn.request().input("empId", sql.VarChar, empId).query(sqlCommand);
    
            logger.info('getProfile - Effect record = ' + result.recordset.length);
            ret = { success: result.recordset };
        } catch (err) {
            console.log(err);
            logger.error('getProfile - Error : Failed to connect database');
            ret = { error: 'Failed to connect database' };
        } finally {
            conn.release();
            return ret;
        }
    }
    return {
        login: login
    }
}

module.exports = AuthenSoapLDapDAO;