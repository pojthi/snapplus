var express = require('express');
var fs = require('fs')
var bodyParser = require('body-parser');

var app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd() + "/swagger.css"), 'utf8');
const logger = require('./utility/logger');
var config = require('./config/config');
const basicAuth = require('express-basic-auth');

var port = process.env.port || 80
    //PRD 80
app.listen(port, () => {
    logger.info('Api is running on port ' + port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));

function apiAuth(username, password) {
    const userMatches = basicAuth.safeCompare(username, config.apiAuthN.user);
    const pwdMatches = basicAuth.safeCompare(password, config.apiAuthN.pwd);

    return userMatches & pwdMatches;
}
app.use(basicAuth({ authorizer: apiAuth, challenge: true }));

var router = require('./routes')();

app.use('/api', router);