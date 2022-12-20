const express = require('express');

const router = express.Router();

router.get('/list-assets', (req, res) => {
    var array = [];
    return res.status(200).send({ status: "success", message: "Get Assets Successfully 😀", data: array })
});

module.exports = router;
