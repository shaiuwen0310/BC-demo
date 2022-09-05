const { Wallets, Gateway } = require('fabric-network');

const path = require('path');
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));

const { buildCCPOrg, buildWallet } = require('../controllers/utils/AppUtil');
const { set, get, getHistory, del } = require('../controllers/utils/scanfileTxnUtil')
const { queryRespFmt, invokeRespFmt, delRespFmt } = require('../controllers/responses/scanfileResp')
const { enumMessage } = require('../controllers/responses/enumMsg')
const { checkQuery, checkInvoke } = require('../controllers/checking/checkScanfileReq')

const setScanfile = async (req, res, next) => {
    const identity = req.body.identity;
    const filename = req.body.values.filename;
    const hash = req.body.values.hash;

    let txnContent = ['scanfile', 'set', filename, hash, identity];

    let channelName = process.env.CHANNEL_NAME;

    const respFmt = new invokeRespFmt(hash, "", enumMessage.RETURN_CODE_0[0], enumMessage.RETURN_CODE_0[1]);
    checkInvoke(identity, filename, hash, enumMessage, respFmt);

    // process.env.GATEWAY_FILE_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/order-mgmt-node-api/gateway/orderNet.yaml";
    // process.env.WALLET_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/order-mgmt-node-api/wallet";

    if (respFmt.getRtnc() === 0)
        // ------ 讀取gateway的yaml設定檔(絕對路徑) ------
        var ccpObject = buildCCPOrg(process.env.GATEWAY_FILE_PATH, enumMessage, respFmt);

    if (respFmt.getRtnc() === 0)
        // ------ 讀取identity存放路徑(絕對路徑) ------
        var wallet = await buildWallet(Wallets, ccpObject, process.env.WALLET_PATH, enumMessage, respFmt);

    if (respFmt.getRtnc() === 0)
        // ------ 透過gateway連接指定通道的網路(目前通道為ngmtsyschannel) ------
        // ------ 提供網路、交易資訊(合約名稱、功能名稱、各個參數)，以進行交易 ------
        var result = await set(identity, wallet, ccpObject, channelName, new Gateway(), txnContent, enumMessage, respFmt, next);

    logger.info(enumMessage.LOGGER_DISPLAY_OUTPUT + JSON.stringify(respFmt))
    res.status(200).send(JSON.stringify(respFmt));
    if (respFmt.getRtnc() === enumMessage.RETURN_CODE_10[0])
        next(process.exit())
}

const findList = async (req, res, next) => {
    const identity = req.body.identity;
    const hash = req.body.hash;

    let txnContent = ['scanfile', 'get'].concat(hash);

    let channelName = process.env.CHANNEL_NAME;

    const respFmt = new queryRespFmt(hash, enumMessage.RETURN_CODE_0[0], enumMessage.RETURN_CODE_0[1]);
    checkQuery(identity, hash, enumMessage, respFmt);

    // process.env.GATEWAY_FILE_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/gateway/orderNet.yaml";
    // process.env.WALLET_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/wallet";

    if (respFmt.getRtnc() === 0)
        // ------ 讀取gateway的yaml設定檔(絕對路徑) ------
        var ccpObject = buildCCPOrg(process.env.GATEWAY_FILE_PATH, enumMessage, respFmt);

    if (respFmt.getRtnc() === 0)
        // ------ 讀取identity存放路徑(絕對路徑) ------
        var wallet = await buildWallet(Wallets, ccpObject, process.env.WALLET_PATH, enumMessage, respFmt);

    if (respFmt.getRtnc() === 0)
        // ------ 透過gateway連接指定通道的網路(目前通道為ngmtsyschannel) ------
        // ------ 提供網路、交易資訊(合約名稱、功能名稱、各個參數)，以進行交易 ------
        var result = await get(identity, wallet, ccpObject, channelName, new Gateway(), txnContent, enumMessage, respFmt);

    logger.info(enumMessage.LOGGER_DISPLAY_OUTPUT + JSON.stringify(respFmt))
    res.status(200).send(JSON.stringify(respFmt));
    if (respFmt.getRtnc() === enumMessage.RETURN_CODE_12[0])
        next(process.exit())
}

const findHistory = async (req, res, next) => {
    const identity = req.body.identity;
    const hash = req.body.hash;

    let txnContent = ['scanfile', 'gethist'].concat(hash);

    let channelName = process.env.CHANNEL_NAME;

    const respFmt = new queryRespFmt(hash, enumMessage.RETURN_CODE_0[0], enumMessage.RETURN_CODE_0[1]);
    checkQuery(identity, hash, enumMessage, respFmt);

    // process.env.GATEWAY_FILE_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/gateway/orderNet.yaml";
    // process.env.WALLET_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/wallet";

    if (respFmt.getRtnc() === 0)
        // ------ 讀取gateway的yaml設定檔(絕對路徑) ------
        var ccpObject = buildCCPOrg(process.env.GATEWAY_FILE_PATH, enumMessage, respFmt);

    if (respFmt.getRtnc() === 0)
        // ------ 讀取identity存放路徑(絕對路徑) ------
        var wallet = await buildWallet(Wallets, ccpObject, process.env.WALLET_PATH, enumMessage, respFmt);

    if (respFmt.getRtnc() === 0)
        // ------ 透過gateway連接指定通道的網路(目前通道為ngmtsyschannel) ------
        // ------ 提供網路、交易資訊(合約名稱、功能名稱、各個參數)，以進行交易 ------
        var result = await getHistory(identity, wallet, ccpObject, channelName, new Gateway(), txnContent, enumMessage, respFmt);

    logger.info(enumMessage.LOGGER_DISPLAY_OUTPUT + JSON.stringify(respFmt))
    res.status(200).send(JSON.stringify(respFmt));
    if (respFmt.getRtnc() === enumMessage.RETURN_CODE_13[0])
        next(process.exit())
}

const delScanfile = async (req, res, next) => {
    const identity = req.body.identity;
    const hash = req.body.hash;

    let txnContent = ['scanfile', 'del', hash];

    let channelName = process.env.CHANNEL_NAME;

    const respFmt = new delRespFmt(hash, enumMessage.RETURN_CODE_0[0], enumMessage.RETURN_CODE_0[1]);
    checkQuery(identity, hash, enumMessage, respFmt);

    // process.env.GATEWAY_FILE_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/gateway/orderNet.yaml";
    // process.env.WALLET_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/wallet";

    if (respFmt.getRtnc() === 0)
        // ------ 讀取gateway的yaml設定檔(絕對路徑) ------
        var ccpObject = buildCCPOrg(process.env.GATEWAY_FILE_PATH, enumMessage, respFmt);

    if (respFmt.getRtnc() === 0)
        // ------ 讀取identity存放路徑(絕對路徑) ------
        var wallet = await buildWallet(Wallets, ccpObject, process.env.WALLET_PATH, enumMessage, respFmt);

    if (respFmt.getRtnc() === 0)
        // ------ 透過gateway連接指定通道的網路(目前通道為ngmtsyschannel) ------
        // ------ 提供網路、交易資訊(合約名稱、功能名稱、各個參數)，以進行交易 ------
        var result = await del(identity, wallet, ccpObject, channelName, new Gateway(), txnContent, enumMessage, respFmt);

    logger.info(enumMessage.LOGGER_DISPLAY_OUTPUT + JSON.stringify(respFmt))
    res.status(200).send(JSON.stringify(respFmt));
    if (respFmt.getRtnc() === enumMessage.RETURN_CODE_14[0])
        next(process.exit())
}


module.exports = {
    setScanfile: setScanfile,
    findList: findList,
    findHistory: findHistory,
    delScanfile: delScanfile
}
