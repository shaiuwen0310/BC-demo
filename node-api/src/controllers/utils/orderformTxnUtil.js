'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const log4js = require("log4js");
const { nextTick } = require('process');
const logger = log4js.getLogger(path.basename(__filename).concat(" ", process.pid));

const addAnOrderform = async (identity, wallet, ccp, channelName, gateway, txnInfo, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "addAnOrderform");

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
		const result = await contract.submitTransaction(txnInfo[1], txnInfo[2], txnInfo[3], txnInfo[4], txnInfo[5], txnInfo[6], txnInfo[7], txnInfo[8], txnInfo[9], txnInfo[10], txnInfo[11]);
		logger.info(enumMessage.LOGGER_DISPLAY_SUBMIT_TXN);

		// 處理從合約收到的json格式, !!!配合合約調整!!!
		var objectResult = JSON.parse(result);
		respObject.setTime(objectResult['time']);
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

const modifyAnOrderform = async (identity, wallet, ccp, channelName, gateway, txnInfo, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "modifyAnOrderform");

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
		const result = await contract.submitTransaction(txnInfo[1], txnInfo[2], txnInfo[3], txnInfo[4], txnInfo[5], txnInfo[6], txnInfo[7], txnInfo[8], txnInfo[9], txnInfo[10], txnInfo[11]);
		logger.info(enumMessage.LOGGER_DISPLAY_SUBMIT_TXN);

		// 處理從合約收到的json格式, !!!配合合約調整!!!
		var objectResult = JSON.parse(result);
		respObject.setTime(objectResult['time']);
		respObject.setTxid(objectResult['txid']);
		respObject.setRtnc(objectResult['rtnc']);
		respObject.setMessage(objectResult['message']);

		return result;
	} catch (error) {
		logger.error(enumMessage.RETURN_CODE_11[1] + error);
		respObject.setRtnc(enumMessage.RETURN_CODE_11[0]);
		respObject.setMessage(enumMessage.RETURN_CODE_11[1]);
	} finally {
		gateway.disconnect();
	}

};

const getOrderform = async (identity, wallet, ccp, channelName, gateway, txnInfo, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "getOrderform");

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

const getHistOrderform = async (identity, wallet, ccp, channelName, gateway, txnInfo, enumMessage, respObject) => {
	logger.trace(enumMessage.LOGGER_DISPLAY_ENTRANCE + "getHistOrderform");

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

module.exports = {
	addAnOrderform: addAnOrderform,
	modifyAnOrderform: modifyAnOrderform,
	getOrderform: getOrderform,
	getHistOrderform: getHistOrderform
};


