'use strict';

const path = require('path');
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));


const buildCAClient = (FabricCAServices, ccp, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "buildCAClient");
	// Create a new CA client for interacting with the CA.
	const orgName = ccp.client.organization; //Org1
	const caHostName = ccp.organizations[orgName].certificateAuthorities[0]; //ca-org1
	const caInfo = ccp.certificateAuthorities[caHostName]; //lookup CA details from config
	// const caTLSCACerts = caInfo.tlsCACerts.pem;

	if (!caInfo) {
		logger.warn(enumMessage.RETURN_CODE_2[0]);
		logger.warn(enumMessage.RETURN_CODE_2[1]);
		respObject.setRtnc(enumMessage.RETURN_CODE_2[0]);
		respObject.setMessage(enumMessage.RETURN_CODE_2[1]);
	}

	const caClient = new FabricCAServices(caInfo.url, { verify: false }, caInfo.caName);

	logger.trace(enumMessage.LOGGER_DISPLAY_BUILT_CA + caInfo.caName);
	return caClient;
};

const enrollAdmin = async (caClient, ccp, wallet, adminUserId, adminUserPasswd, adminIdentity, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "enrollAdmin");
	try {
		// Check to see if we've already enrolled the admin user.
		const identity = await wallet.get(adminIdentity);
		if (identity) {
			logger.warn(enumMessage.RETURN_CODE_4[0]);
			logger.warn(enumMessage.RETURN_CODE_4[1] + adminIdentity);
			respObject.setRtnc(enumMessage.RETURN_CODE_4[0]);
			respObject.setMessage(enumMessage.RETURN_CODE_4[1] + adminIdentity);
		}

		// Enroll the admin user, and import the new identity into the wallet.
		const orgName = ccp.client.organization; //Org1
		const orgMspId = ccp.organizations[orgName].mspid; //Org1MSP

		const enrollment = await caClient.enroll({ enrollmentID: adminUserId, enrollmentSecret: adminUserPasswd });
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: orgMspId,
			type: 'X.509',
		};
		await wallet.put(adminIdentity, x509Identity);
		logger.info(enumMessage.LOGGER_DISPLAY_ENROLLED_ADMIN);
	} catch (error) {
		logger.error(enumMessage.RETURN_CODE_5[1] + error);
		respObject.setRtnc(enumMessage.RETURN_CODE_5[0]);
		respObject.setMessage(enumMessage.RETURN_CODE_5[1]);
	}
};

const registerAndEnrollUser = async (caClient, ccp, wallet, adminUserId, userId, affiliation, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "registerAndEnrollUser");

	try {
		// Check to see if we've already enrolled the user
		const userIdentity = await wallet.get(userId);
		if (userIdentity) {
			logger.warn(enumMessage.RETURN_CODE_6[0]);
			logger.warn(enumMessage.RETURN_CODE_6[1] + userId);
			respObject.setRtnc(enumMessage.RETURN_CODE_6[0]);
			respObject.setMessage(enumMessage.RETURN_CODE_6[1] + userId);
		}

		// Must use an admin to register a new user
		const adminIdentity = await wallet.get(adminUserId);
		if (!adminIdentity) {
			logger.warn(enumMessage.RETURN_CODE_7[0]);
			logger.warn(enumMessage.RETURN_CODE_7[1] + adminUserId);
			respObject.setRtnc(enumMessage.RETURN_CODE_7[0]);
			respObject.setMessage(enumMessage.RETURN_CODE_7[1] + adminUserId);
		}

		const orgName = ccp.client.organization; //Org1
		const orgMspId = ccp.organizations[orgName].mspid; //Org1MSP

		// build a user object for authenticating with the CA
		const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
		const adminUser = await provider.getUserContext(adminIdentity, adminUserId);

		// Register the user, enroll the user, and import the new identity into the wallet.
		// if affiliation is specified by client, the affiliation value must be configured in CA
		const secret = await caClient.register({
			affiliation: affiliation,
			enrollmentID: userId,
			role: 'client',
			// attrs: 
		}, adminUser);
		const enrollment = await caClient.enroll({
			enrollmentID: userId,
			enrollmentSecret: secret
		});
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: orgMspId,
			type: 'X.509',
		};
		await wallet.put(userId, x509Identity);
		logger.info(enumMessage.LOGGER_DISPLAY_ENROLLED_USER + userId);
	} catch (error) {
		logger.error(enumMessage.RETURN_CODE_8[1] + error);
		respObject.setRtnc(enumMessage.RETURN_CODE_8[0]);
		respObject.setMessage(enumMessage.RETURN_CODE_8[1]);
	}
};


module.exports = {
	buildCAClient: buildCAClient,
	enrollAdmin: enrollAdmin,
	registerAndEnrollUser: registerAndEnrollUser
};
