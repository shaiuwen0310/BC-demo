const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');

const path = require('path');
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));

const { buildCAClient, enrollAdmin, registerAndEnrollUser } = require('../controllers/utils/CAUtil');
const { buildCCPOrg, buildWallet, } = require('../controllers/utils/AppUtil');
const { caResponseFormat } = require('../controllers/responses/caResp')
const { enumMessage } = require('../controllers/responses/enumMsg')
const { checkEnrollAdmin, checkEnrollUser } = require('../controllers/checking/checkCAReq')


const enrollAdminIdentity = async (req, res, next) => {
    const enrollId = req.body.registrar.enrollId;
    const enrollSecret = req.body.registrar.enrollSecret;
    const identity = req.body.identity;

    const caRespFmt = new caResponseFormat(identity, enumMessage.RETURN_CODE_0[0], enumMessage.RETURN_CODE_0[1]);
    checkEnrollAdmin(enrollId, enrollSecret, identity, enumMessage, caRespFmt);

    // process.env.GATEWAY_FILE_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/gateway/orderNet.yaml";
    // process.env.WALLET_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/wallet";

    if (caRespFmt.getRtnc() === 0)
        // ------ 讀取gateway的yaml設定檔(絕對路徑) ------
        var ccpObject = buildCCPOrg(process.env.GATEWAY_FILE_PATH, enumMessage, caRespFmt);

    if (caRespFmt.getRtnc() === 0)
        // ------ 建立CA client端, 與gateway中指定的CA server互動 ------
        var caClientObject = buildCAClient(FabricCAServices, ccpObject, enumMessage, caRespFmt);

    if (caRespFmt.getRtnc() === 0)
        // ------ 建立管理身份(identities)的錢包(絕對路徑) ------
        var walletObject = await buildWallet(Wallets, ccpObject, process.env.WALLET_PATH, enumMessage, caRespFmt);

    if (caRespFmt.getRtnc() === 0)
        // ------ 產生CA admin user 的新身份(identities) ------
        await enrollAdmin(caClientObject, ccpObject, walletObject, enrollId, enrollSecret, identity, enumMessage, caRespFmt);

    logger.info(enumMessage.LOGGER_DISPLAY_OUTPUT + JSON.stringify(caRespFmt))
    res.status(200).send(JSON.stringify(caRespFmt));
    if (caRespFmt.getRtnc() === enumMessage.RETURN_CODE_5[0])
        next(process.exit())
}

const enrollUserIdentity = async (req, res, next) => {

    const adminId = req.body.adminId;
    const affiliation = req.body.user.affiliation;
    const identity = req.body.user.identity;

    const caRespFmt = new caResponseFormat(identity, enumMessage.RETURN_CODE_0[0], enumMessage.RETURN_CODE_0[1]);
    checkEnrollUser(adminId, affiliation, identity, enumMessage, caRespFmt);

    // process.env.GATEWAY_FILE_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/gateway/orderNet.yaml";
    // process.env.WALLET_PATH = "/home/judy/go/src/github.com/hyperledger/fabric-project/new-api/wallet";

    if (caRespFmt.getRtnc() === 0)
        // ------ 讀取gateway的yaml設定檔(絕對路徑) ------
        var ccpObject = buildCCPOrg(process.env.GATEWAY_FILE_PATH, enumMessage, caRespFmt);

    if (caRespFmt.getRtnc() === 0)
        // ------ 建立CA client端, 與gateway中指定的CA server互動 ------
        var caClientObject = buildCAClient(FabricCAServices, ccpObject, enumMessage, caRespFmt);

    if (caRespFmt.getRtnc() === 0)
        // ------ 建立管理身份(identities)的錢包(絕對路徑) ------
        var walletObject = await buildWallet(Wallets, ccpObject, process.env.WALLET_PATH, enumMessage, caRespFmt);

    if (caRespFmt.getRtnc() === 0)
        // ------ 產生user 的新身份(identities) ------
        await registerAndEnrollUser(caClientObject, ccpObject, walletObject, adminId, identity, affiliation, enumMessage, caRespFmt);

    logger.info(enumMessage.LOGGER_DISPLAY_OUTPUT + JSON.stringify(caRespFmt))
    res.status(200).send(JSON.stringify(caRespFmt));
    if (caRespFmt.getRtnc() === enumMessage.RETURN_CODE_8[0])
        next(process.exit())
}

module.exports = {
    enrollAdminIdentity: enrollAdminIdentity,
    enrollUserIdentity: enrollUserIdentity
}
