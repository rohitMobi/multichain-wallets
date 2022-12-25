const express = require('express');
const axios = require('axios');
const router = express.Router();

const { getDecodeAuth, base_url, chain_name } = require("./services/data")

router.get('/list-transactions', async(req, res) => {
    var payload = {
        "method" : "listwallettransactions",
        "params" : [100],
        "id" : 1,
        "chain_name" : chain_name
    };
    const encodedToken = await getDecodeAuth();
    const result = await axios(`${base_url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+ encodedToken
        },
        data: payload,
    }).then((result) => {
        return res.status(200).send({ status: "success", message: "Get Transactions Successfully 😀", data: result.data.result })
    }).catch((err) => {
        return err.response;
    });
});

module.exports = router;
