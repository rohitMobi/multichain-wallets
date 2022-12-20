const express = require('express');
const axios = require('axios');
const router = express.Router();
const base_url = "http://localhost:2762/";

const { getDecodeAuth } = require("./services/data")

router.get('/list-streams', async(req, res) => {
    var payload = {
        "method" : "liststreams",
        "params" : [],
        "id" : 1,
        "chain_name" : "dexChain"
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
        return res.status(200).send({ status: "success", message: "Get Streams Successfully 😀", data: result.data.result })
    }).catch((err) => {
        return err.response;
    });
});

module.exports = router;
