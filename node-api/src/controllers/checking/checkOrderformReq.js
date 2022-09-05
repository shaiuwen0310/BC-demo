const path = require('path');
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));

const checkInsertOneOrderform = (identity, uniqueKey, userId, fromHash, hash, groupId, companyId, formSeqNo, type, deptId, enumMessage, respObject) => {
    logger.info(enumMessage.LOGGER_DISPLAY_INPUT, identity, uniqueKey, userId, fromHash, hash, groupId, companyId, formSeqNo, type, deptId);

    if (!identity || !uniqueKey || !userId || !fromHash || !hash || !groupId || !companyId || !formSeqNo || !type.toString() || !deptId) {
        logger.warn(enumMessage.RETURN_CODE_9[1]);
        respObject.setRtnc(enumMessage.RETURN_CODE_9[0]);
        respObject.setMessage(enumMessage.RETURN_CODE_9[1])
    }
}

const checkFindOrderform = (identity, uniqueKey, enumMessage, respObject) => {
    logger.info(enumMessage.LOGGER_DISPLAY_INPUT, identity, uniqueKey);

    if (!identity || !uniqueKey) {
        logger.warn(enumMessage.RETURN_CODE_9[1]);
        respObject.setRtnc(enumMessage.RETURN_CODE_9[0]);
        respObject.setMessage(enumMessage.RETURN_CODE_9[1])
    }
}

module.exports = {
    checkInsertOneOrderform: checkInsertOneOrderform,
    checkFindOrderform: checkFindOrderform
}
