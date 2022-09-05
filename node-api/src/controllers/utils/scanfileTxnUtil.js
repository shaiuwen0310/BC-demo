'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const log4js = require("log4js");
const { nextTick } = require('process');
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));

const set = async (identity, wallet, ccp, channelName, gateway, txnInfo, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "set");

	try {
		let connectionOptions = {
			identity: identity,
			wallet: wallet,
			discovery: { enabled: false }
		};

		await gateway.connect(ccp, connectionOptions);
		const network = await gateway.getNetwork(channelName);
		logger.trace(enumMessage.LOGGER_DISPLAY_CONNECTED_NETWORK);

		const contract = await network.getContract(txnInfo[0]);
		const result = await contract.submitTransaction(txnInfo[1], txnInfo[2], txnInfo[3], txnInfo[4]);
		logger.info(enumMessage.LOGGER_DISPLAY_SUBMIT_TXN);

		// 處理從合約收到的json格式, !!!配合合約調整!!!
		var objectResult = JSON.parse(result);
		respObject.setTxid(objectResult['txid']);
		respObject.setRtnc(objectResult['rtnc']);
		respObject.setMessage(objectResult['message']);

		return result;
	} catch (error) {
		logger.error(enumMessage.RETURN_CODE_10[1] + error);
		respObject.setRtnc(enumMessage.RETURN_CODE_10[0]);
		respObject.setMessage(enumMessage.RETURN_CODE_10[1]);
	} finally {
		gateway.disconnect();
	}

};

const get = async (identity, wallet, ccp, channelName, gateway, txnInfo, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "gets");

	try {
		let connectionOptions = {
			identity: identity,
			wallet: wallet,
			discovery: { enabled: false }
		};

		await gateway.connect(ccp, connectionOptions);
		const network = await gateway.getNetwork(channelName);
		logger.trace(enumMessage.LOGGER_DISPLAY_CONNECTED_NETWORK);

		const contract = await network.getContract(txnInfo[0]);

		let allResult = [];
		// 多筆
		for (var i = 2; i < txnInfo.length; i++) {
			const result = await contract.evaluateTransaction(txnInfo[1], txnInfo[i]);
			allResult.push(JSON.parse(result));
		}

		logger.info(enumMessage.LOGGER_DISPLAY_SUBMIT_TXN);

		// 處理從合約收到的json格式, !!!配合合約調整!!!
		respObject.setInfo(allResult);

		return allResult;
	} catch (error) {
		logger.error(enumMessage.RETURN_CODE_12[1] + error);
		respObject.setRtnc(enumMessage.RETURN_CODE_12[0]);
		respObject.setMessage(enumMessage.RETURN_CODE_12[1]);
	} finally {
		gateway.disconnect();
	}

};

const getHistory = async (identity, wallet, ccp, channelName, gateway, txnInfo, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "getHistory");

	try {
		let connectionOptions = {
			identity: identity,
			wallet: wallet,
			discovery: { enabled: false }
		};

		await gateway.connect(ccp, connectionOptions);
		const network = await gateway.getNetwork(channelName);
		logger.trace(enumMessage.LOGGER_DISPLAY_CONNECTED_NETWORK);

		const contract = await network.getContract(txnInfo[0]);

		const result = await contract.evaluateTransaction(txnInfo[1], txnInfo[2]);

		logger.info(enumMessage.LOGGER_DISPLAY_SUBMIT_TXN);

		// 處理從合約收到的json格式, !!!配合合約調整!!!
		var objectResult = JSON.parse(result);
		respObject.setRtnc(objectResult['rtnc']);
		respObject.setMessage(objectResult['message']);
		respObject.setInfo(objectResult['info']);

		return result;
	} catch (error) {
		logger.error(enumMessage.RETURN_CODE_13[1] + error);
		respObject.setRtnc(enumMessage.RETURN_CODE_13[0]);
		respObject.setMessage(enumMessage.RETURN_CODE_13[1]);
	} finally {
		gateway.disconnect();
	}

};

const del = async (identity, wallet, ccp, channelName, gateway, txnInfo, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "del");

	try {
		let connectionOptions = {
			identity: identity,
			wallet: wallet,
			discovery: { enabled: false }
		};

		await gateway.connect(ccp, connectionOptions);
		const network = await gateway.getNetwork(channelName);
		logger.trace(enumMessage.LOGGER_DISPLAY_CONNECTED_NETWORK);

		const contract = await network.getContract(txnInfo[0]);

		const result = await contract.submitTransaction(txnInfo[1], txnInfo[2]);

		logger.info(enumMessage.LOGGER_DISPLAY_SUBMIT_TXN);

		// 處理從合約收到的json格式, !!!配合合約調整!!!
		var objectResult = JSON.parse(result);
		respObject.setRtnc(objectResult['rtnc']);
		respObject.setMessage(objectResult['message']);

		return result;
	} catch (error) {
		logger.error(enumMessage.RETURN_CODE_14[1] + error);
		respObject.setRtnc(enumMessage.RETURN_CODE_14[0]);
		respObject.setMessage(enumMessage.RETURN_CODE_14[1]);
	} finally {
		gateway.disconnect();
	}

};

module.exports = {
	set: set,
	get: get,
	getHistory: getHistory,
	del: del
};


