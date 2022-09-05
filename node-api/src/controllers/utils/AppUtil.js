'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));

const buildCCPOrg = (ccpPath, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "buildCCPOrg");
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		logger.warn(enumMessage.RETURN_CODE_1[0]);
		logger.warn(enumMessage.RETURN_CODE_1[1] + ccpPath);
		respObject.setRtnc(enumMessage.RETURN_CODE_1[0]);
		respObject.setMessage(enumMessage.RETURN_CODE_1[1] + ccpPath);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp = yaml.load(contents);

	logger.trace(enumMessage.LOGGER_DISPLAY_LOADED_CCP + ccpPath);
	return ccp;
};

const buildWallet = async (Wallets, ccp, walletPath, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "buildWallet");
	// Create a new  wallet : Note that wallet is for managing identities.
	try {
		const orgName = ccp.client.organization; //Org1
		const orgWalletPath = path.resolve(walletPath, orgName)

		let wallet;
		if (orgWalletPath) {
			wallet = await Wallets.newFileSystemWallet(orgWalletPath);
			logger.trace(enumMessage.LOGGER_DISPLAY_BUILT_FS_WALLET + orgWalletPath);
		} else {
			wallet = await Wallets.newInMemoryWallet();
			logger.trace(enumMessage.LOGGER_DISPLAY_BUILT_TEMP_WALLET);
		}

		return wallet;
	} catch (error) {
		logger.error(enumMessage.RETURN_CODE_3[1] + error);
		respObject.setRtnc(enumMessage.RETURN_CODE_3[0]);
		respObject.setMessage(enumMessage.RETURN_CODE_3[1]);
	}

};

const prettyJSONString = (inputString) => {
	if (inputString) {
		return JSON.stringify(JSON.parse(inputString), null, 2);
	}
	else {
		return inputString;
	}
}


module.exports = {
	buildCCPOrg: buildCCPOrg,
	buildWallet: buildWallet,
	prettyJSONString: prettyJSONString
};
