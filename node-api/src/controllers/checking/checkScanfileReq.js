const path = require('path');
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));

const checkInvoke = (identity, filename, hash, enumMessage, respObject) => {
    logger.info(enumMessage.LOGGER_DISPLAY_INPUT, identity, filename, hash);

    if (!identity || !filename || !hash) {
        logger.warn(enumMessage.RETURN_CODE_9[1]);
        respObject.setRtnc(enumMessage.RETURN_CODE_9[0]);
        respObject.setMessage(enumMessage.RETURN_CODE_9[1])
    }
}

const checkQuery = (identity, hash, enumMessage, respObject) => {
    logger.info(enumMessage.LOGGER_DISPLAY_INPUT, identity, hash);

    if (!identity || !hash) {
        logger.warn(enumMessage.RETURN_CODE_9[1]);
        respObject.setRtnc(enumMessage.RETURN_CODE_9[0]);
        respObject.setMessage(enumMessage.RETURN_CODE_9[1])
    }
}

module.exports = {
    checkInvoke: checkInvoke,
    checkQuery: checkQuery
}
