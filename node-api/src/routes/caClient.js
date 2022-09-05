const express = require('express');

const router = express.Router();

const caClientCtrl = require('../controllers/caClient');

router.post('/enrolladmin/v1', caClientCtrl.enrollAdminIdentity);
router.post('/enrolluser/v1', caClientCtrl.enrollUserIdentity);


module.exports = router;
