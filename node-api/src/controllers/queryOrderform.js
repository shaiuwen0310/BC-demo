const { Wallets, Gateway } = require('fabric-network');

const path = require('path');
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));

const { buildCCPOrg, buildWallet } = require('../controllers/utils/AppUtil');
const { getOrderform, getHistOrderform } = require('../controllers/utils/orderformTxnUtil')
const { queryOrderformResponseFormat } = require('../controllers/responses/orderformResp')
const { enumMessage } = require('../controllers/responses/enumMsg')
const { checkFindOrderform } = require('../controllers/checking/checkOrderformReq')


const findOrderform = async (req, res, next) => {
    const identity = req.body.identity;
    const uniqueKey = req.body.uniqueKey;

    let txnContent = ['orderform', 'get'].concat(uniqueKey);

    let channelName = "ngmtsyschannel";

    const orderformRespFmt = new queryOrderformResponseFormat(uniqueKey, enumMessage.RETURN_CODE_0[0], enumMessage.RETURN_CODE_0[1]);
    checkFindOrderform(identity, uniqueKey, enumMessage, orderformRespFmt);

    // process.env.GATEWAY_FILE_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/gateway/orderNet.yaml";
    // process.env.WALLET_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/wallet";

    if (orderformRespFmt.getRtnc() === 0)
        // ------ 讀取gateway的yaml設定檔(絕對路徑) ------
        var ccpObject = buildCCPOrg(process.env.GATEWAY_FILE_PATH, enumMessage, orderformRespFmt);

    if (orderformRespFmt.getRtnc() === 0)
        // ------ 讀取identity存放路徑(絕對路徑) ------
        var wallet = await buildWallet(Wallets, ccpObject, process.env.WALLET_PATH, enumMessage, orderformRespFmt);

    if (orderformRespFmt.getRtnc() === 0)
        // ------ 透過gateway連接指定通道的網路(目前通道為ngmtsyschannel) ------
        // ------ 提供網路、交易資訊(合約名稱、功能名稱、各個參數)，以進行交易 ------
        var result = await getOrderform(identity, wallet, ccpObject, channelName, new Gateway(), txnContent, enumMessage, orderformRespFmt);

    logger.info(enumMessage.LOGGER_DISPLAY_OUTPUT + JSON.stringify(orderformRespFmt))
    res.status(200).send(JSON.stringify(orderformRespFmt));
    if (orderformRespFmt.getRtnc() === enumMessage.RETURN_CODE_12[0])
        next(process.exit())
}

const findHistOrderform = async (req, res, next) => {
    const identity = req.body.identity;
    const uniqueKey = req.body.uniqueKey;

    let txnContent = ['orderform', 'gethist'].concat(uniqueKey);

    let channelName = "ngmtsyschannel";

    const orderformRespFmt = new queryOrderformResponseFormat(uniqueKey, enumMessage.RETURN_CODE_0[0], enumMessage.RETURN_CODE_0[1]);
    checkFindOrderform(identity, uniqueKey, enumMessage, orderformRespFmt);

    // process.env.GATEWAY_FILE_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/gateway/orderNet.yaml";
    // process.env.WALLET_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/wallet";

    if (orderformRespFmt.getRtnc() === 0)
        // ------ 讀取gateway的yaml設定檔(絕對路徑) ------
        var ccpObject = buildCCPOrg(process.env.GATEWAY_FILE_PATH, enumMessage, orderformRespFmt);

    if (orderformRespFmt.getRtnc() === 0)
        // ------ 讀取identity存放路徑(絕對路徑) ------
        var wallet = await buildWallet(Wallets, ccpObject, process.env.WALLET_PATH, enumMessage, orderformRespFmt);

    if (orderformRespFmt.getRtnc() === 0)
        // ------ 透過gateway連接指定通道的網路(目前通道為ngmtsyschannel) ------
        // ------ 提供網路、交易資訊(合約名稱、功能名稱、各個參數)，以進行交易 ------
        var result = await getHistOrderform(identity, wallet, ccpObject, channelName, new Gateway(), txnContent, enumMessage, orderformRespFmt);

    logger.info(enumMessage.LOGGER_DISPLAY_OUTPUT + JSON.stringify(orderformRespFmt))
    res.status(200).send(JSON.stringify(orderformRespFmt));
    if (orderformRespFmt.getRtnc() === enumMessage.RETURN_CODE_13[0])
        next(process.exit())
}


module.exports = {
    findOrderform: findOrderform,
    findHistOrderform: findHistOrderform
}
