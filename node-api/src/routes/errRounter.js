const express = require('express');

const router = express.Router();

router.post('*', ((req, res, next) => {
    res.status(405)
    res.send({
        message: 'Method Not Allowed'
    });
    // next(process.exit(1));
}));


module.exports = router;
