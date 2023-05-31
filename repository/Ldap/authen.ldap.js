const ldap = require('ldapjs');
const config = require('../../config/config');
const logger = require("../../utility/logger");

let client;

// unbind after completion of process
function closeConnection() {
    console.log('closeConnection');
    client.unbind(err => {
        if (err != null)
            console.log('unbind error', err);
    });
}

function search(userName) {

    const searchOptions = {
        attributes: [
            "uid",
            "cn",
            "displayName"
        ],
        filter: '(uid=' + userName + ')', // search textls
        scope: 'sub'
    };

    return new Promise((resolve, reject) => {
        client.search(config.baseDn, searchOptions, (err, res) => {
            res.on('searchEntry', entry => {
                //console.log('searchEntry', entry.object);
                resolve(entry.object);
            });
            res.on('searchReference', referral => {
                //console.log('referral: ' + referral.uris.join());
                logger.info('Search Ldap - ' + referral.uris.join());
                resolve(referral.uris.join());
            });
            res.on('error', err => {
                logger.error('Search Ldap - Error : ' + err.message);
                //console.error('search error: ' + err.message);
                reject(err);
            });
            res.on('end', result => {
                //console.log('If not found', result);
                reject({ message: 'User not found' })
            });
        });
    })

}

function authenticate(userName, password) {

    client = ldap.createClient({ url: config.ldapUrl });

    return new Promise((resolve, reject) => {
       client.bind('uid=' + userName + ','+config.baseDn, password, err => {
           if (err) {
              // throw new Error(err)
              console.log(err);
               reject(err);
           }
           resolve('Authenticated successfully');
       });
    })

}

async function start(req, res) {
    let searchResponseData;

    logger.info('Search Ldap - userName => ' + req.body.AuthenParam.userName);
    logger.info('Search Ldap - password => ********');

    let userName = req.body.AuthenParam.userName;
    let password = req.body.AuthenParam.password;

    try {
        await authenticate(userName, password)
        .then(authenticateResponse => {
            logger.info('Ldap authenticate - authenticateResponse : ' + authenticateResponse);
            //console.log('authenticateResponse', authenticateResponse)
            return search(userName);
        })
        .then(searchResponse => {
            logger.info('LDAP Attribute Search : ' + searchResponse);
            //console.log('LDAP Attribute Search: ', searchResponse)
            searchResponseData = searchResponse
            return closeConnection();
        })
        .catch(error => {
            logger.error('LDAP Search - Error : ' + error);
            return res.json({ failed: error });
        })
    } catch (e) {
        //console.error(e);
    } finally {
        //console.log('We do cleanup here');
    }

    return res.json({ success: searchResponseData });
}

module.exports.start = start;