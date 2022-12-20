const express = require('express');

const router = express.Router();

router.get('/list-streams', (req, res) => {
    var array = [];
    return res.status(200).send({ status: "success", message: "Get Streams Successfully 😀", data: array })
});

module.exports = router;
