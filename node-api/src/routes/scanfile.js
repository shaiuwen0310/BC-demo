const express = require('express');

const router = express.Router();

const scanfileCtrl = require('../controllers/scanfile');

router.post('/invoke', scanfileCtrl.setScanfile);
router.post('/lists', scanfileCtrl.findList);
router.post('/history', scanfileCtrl.findHistory);
router.post('/delete', scanfileCtrl.delScanfile);


module.exports = router;
