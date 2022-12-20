const express = require('express');

const router = express.Router();

router.get('/list-addresses', (req, res) => {
    var array = [];
    return res.status(200).send({ status: "success", message: "Get Addresses Successfully 😀", data: array })
});

module.exports = router;
