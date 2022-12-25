const express = require('express');
const axios = require('axios');
const router = express.Router();

const { getDecodeAuth, base_url, chain_name } = require("./services/data")

router.get('/list-addresses', async(req, res) => {
    var payload = {
        "method" : "listaddresses",
        "params" : [],
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
        return res.status(200).send({ status: "success", message: "Get Addresses Successfully 😀", data: result.data.result })
    }).catch((err) => {
        return err.response;
    });
});

router.post('/new-address', async(req, res) => {
    var payload = {
        "method" : "getnewaddress",
        "params" : [],
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
        return res.status(200).send({ status: "success", message: "New Addresses Successfully 😀", data: result.data.result })
    }).catch((err) => {
        return err.response;
    });
});

router.post('/change-permission-address', async(req, res) => {
    const { grant_revoke, address, type } = req.body;

    if(!grant_revoke || !address || !type){
        return res.status(500).send({ status: "error", message: "Please provide grant or revoke, address & permission type" })
    }

    var payload = {
        "method" : grant_revoke,
        "params" : [address, type],
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
        return res.status(200).send({ status: "success", message: "Change the permission 😀", data: result.data.result })
    }).catch((err) => {
        return err.response;
    });
});

module.exports = router;
