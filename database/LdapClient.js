const ldap = require('ldapjs');

const config = require('../config/config');
const logger = require("../utility/logger");

function LdapClient() {

    const ldapClient = connect();

    function connect() {
        //console.log("LDAP URL:", config.ldapUrl);
        return ldapClient = ldap.createClient({
            url: config.ldapUrl
        });
    }

    function closeConnection() {
        //console.log('closeConnection');
        ldapClient.unbind(err => {
            if (err != null)
            logger.error("LdapClient - " + err);
        });
    }

    return {
        connect: connect,
        closeConnection: closeConnection
    }
}

module.exports = LdapClient;