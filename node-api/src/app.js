const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const path = require('path');
const log4js = require("log4js");
log4js.configure({
	appenders: { out: { type: 'console' } },
	categories: { default: { appenders: ['out'], level: 'trace' } },
	// pm2: true,
	// pm2InstanceVar: 'INSTANCE_ID',
	disableClustering: true
});
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));

const CAClientRouter = require('./routes/caClient');
const orderformRouter = require('./routes/orderform');
const scanfileRouter = require('./routes/scanfile');
const errRouter = require('./routes/errRounter');

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(log4js.connectLogger(logger)); // log增加request URL

app.use('/caclient', CAClientRouter);

app.use('/orderform', orderformRouter);

app.use('/v1/scanfile', scanfileRouter);

app.use('*', errRouter);

// process.env.NODE_API_PORT=3001
app.listen(process.env.NODE_API_PORT, () => {
	logger.info('****************** App listening on port ' + process.env.NODE_API_PORT + '! ******************');

});
