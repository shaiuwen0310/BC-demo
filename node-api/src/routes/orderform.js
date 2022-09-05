const express = require('express');

const router = express.Router();

const orderformInvokeCtrl = require('../controllers/invokeOrderform');
const orderformQueryCtrl = require('../controllers/queryOrderform');

router.post('/insertOneOrderform/v1', orderformInvokeCtrl.insertOneOrderform);
router.post('/modifyOneOrderform/v1', orderformInvokeCtrl.modifyOneOrderform);

router.post('/findOrderform/v1', orderformQueryCtrl.findOrderform);
router.post('/findHistOrderform/v1', orderformQueryCtrl.findHistOrderform);


module.exports = router;
