const express = require('express');
const axios = require('axios');
const router = express.Router();

const { getDecodeAuth, base_url, chain_name } = require("./services/data")

router.get('/list-streams', async(req, res) => {
    var payload = {
        "method" : "liststreams",
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
        return res.status(200).send({ status: "success", message: "Get Streams Successfully 😀", data: result.data.result })
    }).catch((err) => {
        return err.response;
    });
});

router.post('/create-stream', async(req, res) => {
    const { name } = req.body;

    var payload = {
        "method" : "create",
        "params" : ["stream", name, false],
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
        return res.status(200).send({ status: "success", message: "Create Stream Successfully 😀", data: result.data.result })
    }).catch((err) => {
        return err.response;
    });
});

router.post('/subscribe-stream', async(req, res) => {
    const { name } = req.body;

    var payload = {
        "method" : "subscribe",
        "params" : [name],
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
        return res.status(200).send({ status: "success", message: "Subscribe Stream Successfully 😀", data: result.data.result })
    }).catch((err) => {
        return err.response;
    });
});

router.post('/list-stream-items', async(req, res) => {
    const { name } = req.body;

    var payload = {
        "method" : "liststreamitems",
        "params" : [name],
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
        return res.status(200).send({ status: "success", message: "Stream Items Get Successfully 😀", data: result.data.result })
    }).catch((err) => {
        return err.response;
    });
});

router.post('/publish-stream-item', async(req, res) => {
    const { name, key, value } = req.body;

    var payload = {
        "method" : "publish",
        "params" : [name, key, value],
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
        return res.status(200).send({ status: "success", message: "Stream Items Get Successfully 😀", data: result.data.result })
    }).catch((err) => {
        return err.response;
    });
});

module.exports = router;
