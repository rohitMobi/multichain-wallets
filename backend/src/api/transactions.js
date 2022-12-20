const express = require('express');

const router = express.Router();

router.get('/list-transactions', (req, res) => {
    var array = [];
    return res.status(200).send({ status: "success", message: "Get Transactions Successfully 😀", data: array })
});

module.exports = router;
