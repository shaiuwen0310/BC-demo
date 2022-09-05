const { Wallets, Gateway } = require('fabric-network');

const path = require('path');
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));

const { buildCCPOrg, buildWallet } = require('../controllers/utils/AppUtil');
const { addAnOrderform, modifyAnOrderform } = require('../controllers/utils/orderformTxnUtil')
const { invokeOrderformResponseFormat } = require('../controllers/responses/orderformResp')
const { enumMessage } = require('../controllers/responses/enumMsg')
const { checkInsertOneOrderform } = require('../controllers/checking/checkOrderformReq')


const insertOneOrderform = async (req, res, next) => {
    const identity = req.body.identity;
    const uniqueKey = req.body.values.uniqueKey;
    const userId = req.body.values.userId;
    const fromHash = req.body.values.fromHash;
    const hash = req.body.values.hash;
    const groupId = req.body.values.groupId;
    const companyId = req.body.values.companyId;
    const formSeqNo = req.body.values.formSeqNo;
    const type = req.body.values.type;
    const deptId = req.body.values.deptId;

    let txnContent = ['orderform', 'set', uniqueKey, userId, fromHash, hash, identity, groupId, companyId, formSeqNo, type, deptId];

    let channelName = "ngmtsyschannel";

    const orderformRespFmt = new invokeOrderformResponseFormat(uniqueKey, "", "", enumMessage.RETURN_CODE_0[0], enumMessage.RETURN_CODE_0[1]);
    checkInsertOneOrderform(identity, uniqueKey, userId, fromHash, hash, groupId, companyId, formSeqNo, type, deptId, enumMessage, orderformRespFmt);

    // process.env.GATEWAY_FILE_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/order-mgmt-node-api/gateway/orderNet.yaml";
    // process.env.WALLET_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/order-mgmt-node-api/wallet";

    if (orderformRespFmt.getRtnc() === 0)
        // ------ 讀取gateway的yaml設定檔(絕對路徑) ------
        var ccpObject = buildCCPOrg(process.env.GATEWAY_FILE_PATH, enumMessage, orderformRespFmt);

    if (orderformRespFmt.getRtnc() === 0)
        // ------ 讀取identity存放路徑(絕對路徑) ------
        var wallet = await buildWallet(Wallets, ccpObject, process.env.WALLET_PATH, enumMessage, orderformRespFmt);

    if (orderformRespFmt.getRtnc() === 0)
        // ------ 透過gateway連接指定通道的網路(目前通道為ngmtsyschannel) ------
        // ------ 提供網路、交易資訊(合約名稱、功能名稱、各個參數)，以進行交易 ------
        var result = await addAnOrderform(identity, wallet, ccpObject, channelName, new Gateway(), txnContent, enumMessage, orderformRespFmt, next);

    logger.info(enumMessage.LOGGER_DISPLAY_OUTPUT + JSON.stringify(orderformRespFmt))
    res.status(200).send(JSON.stringify(orderformRespFmt));
    if (orderformRespFmt.getRtnc() === enumMessage.RETURN_CODE_10[0])
        next(process.exit())
}


// modify、insert的上下文欄位一致
const modifyOneOrderform = async (req, res, next) => {
    const identity = req.body.identity;
    const uniqueKey = req.body.values.uniqueKey;
    const userId = req.body.values.userId;
    const fromHash = req.body.values.fromHash;
    const hash = req.body.values.hash;
    const groupId = req.body.values.groupId;
    const companyId = req.body.values.companyId;
    const formSeqNo = req.body.values.formSeqNo;
    const type = req.body.values.type;
    const deptId = req.body.values.deptId;

    let txnContent = ['orderform', 'modify', uniqueKey, userId, fromHash, hash, identity, groupId, companyId, formSeqNo, type, deptId];

    let channelName = "ngmtsyschannel";

    const orderformRespFmt = new invokeOrderformResponseFormat(uniqueKey, "", "", enumMessage.RETURN_CODE_0[0], enumMessage.RETURN_CODE_0[1]);
    checkInsertOneOrderform(identity, uniqueKey, userId, fromHash, hash, groupId, companyId, formSeqNo, type, deptId, enumMessage, orderformRespFmt);

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
        var result = await modifyAnOrderform(identity, wallet, ccpObject, channelName, new Gateway(), txnContent, enumMessage, orderformRespFmt);

    logger.info(enumMessage.LOGGER_DISPLAY_OUTPUT + JSON.stringify(orderformRespFmt))
    res.status(200).send(JSON.stringify(orderformRespFmt));
    if (orderformRespFmt.getRtnc() === enumMessage.RETURN_CODE_11[0])
        next(process.exit())
}

module.exports = {
    insertOneOrderform: insertOneOrderform,
    modifyOneOrderform: modifyOneOrderform
}
