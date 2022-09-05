const path = require('path');
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));


const checkEnrollAdmin = (enrollId, enrollSecret, identity, enumMessage, respObject) => {
    logger.info(enumMessage.LOGGER_DISPLAY_INPUT, enrollId, enrollSecret, identity);

    if (!enrollId || !enrollSecret || !identity) {
        logger.warn(enumMessage.RETURN_CODE_9[1]);
        respObject.setRtnc(enumMessage.RETURN_CODE_9[0]);
        respObject.setMessage(enumMessage.RETURN_CODE_9[1])
    }
}

const checkEnrollUser = (adminId, affiliation, identity, enumMessage, respObject) => {
    logger.info(enumMessage.LOGGER_DISPLAY_INPUT, adminId, affiliation, identity);

    if (!adminId || !affiliation || !identity) {
        logger.warn(enumMessage.RETURN_CODE_9[1]);
        respObject.setRtnc(enumMessage.RETURN_CODE_9[0]);
        respObject.setMessage(enumMessage.RETURN_CODE_9[1])
    }
}

module.exports = {
    checkEnrollAdmin: checkEnrollAdmin,
    checkEnrollUser: checkEnrollUser
}
