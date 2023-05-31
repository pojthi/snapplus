//const ldapClient = require('../../database/LdapClient');
//const _authenLDAP = require('./authen.ldap');
const mssqlConnPool = require('../../database/DbConnectionPool');
const _authenSoapLDapDAO = require('./authen.soapldap');

module.exports = function(router) {
   // const authenLDAP = _authenLDAP;
   const authenSoapLDAP = _authenSoapLDapDAO(mssqlConnPool);
   //const authenSoapLDAP = _authenSoapLDAP;
   console.log("expose => /authenticate");

    //router.route('/authenticate').post(authenLDAP.start);
    router.route('/authenticate').post(authenSoapLDAP.login);
};