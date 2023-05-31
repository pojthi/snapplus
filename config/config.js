const dotenv = require("dotenv");

dotenv.config();
const {
    DB_SERVER,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_OPTS_ENCRYPT,
    DB_OPTS_ENABLE_ARITH_ABORT,
    DB_MAX_POOL,
    DB_MIN_POOL,
    DB_POOL_IDLE_TIME,
    LDAP_URL,
    BASE_DN,
    API_USER,
    API_PWD
} = process.env;

const dbPort = parseInt(DB_PORT);
const dbOptsEncrypt = DB_OPTS_ENCRYPT === "true";
const dbOptsEnableArithAbort = DB_OPTS_ENABLE_ARITH_ABORT === "true";

module.exports = {
    dbConnectionString: {
        server: DB_SERVER,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
        port: dbPort,
        pool: {
            max: 400,
            min: 1,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: dbOptsEncrypt,
            enableArithAbort: dbOptsEnableArithAbort
        }
    },
    ldapUrl: LDAP_URL,
    baseDn: BASE_DN,
    ldap: {
        soap_wdsl: process.env.LDAP_SOAP_WSDL || "https://prd-ptg-apim.azure-api.net/ptwebservice/ldap_authen/PTWebService.asmx?Apim-Subscription-Key=ee875603f08b45b4862f4995ddd0567e&wsdl",
        soap_endpoint: process.env.LDAP_SOAP_ENDPOINT || "https://prd-ptg-apim.azure-api.net/ptwebservice/ldap_authen/PTWebService.asmx",
        soap_hd: process.env.LDAP_SOAP_HD || "Apim-Subscription-Key",
        soap_hd_key: process.env.LDAP_SOAP_HD_KEY || "ee875603f08b45b4862f4995ddd0567e"
    },
    ldap2: {
        soap_wdsl: process.env.LDAP_SOAP_WSDL || "https://dev-ptldap.pt.co.th/ptwebservice/ptwebservice.asmx?wsdl",
        soap_endpoint: process.env.LDAP_SOAP_ENDPOINT || "https://dev-ptldap.pt.co.th/ptwebservice/ptwebservice.asmx",
        soap_hd: process.env.LDAP_SOAP_HD || "Apim-Subscription-Key",
        soap_hd_key: process.env.LDAP_SOAP_HD_KEY || "ee875603f08b45b4862f4995ddd0567e"
    },
    apiAuthN: {
        user: API_USER,
        pwd: API_PWD
    }
};