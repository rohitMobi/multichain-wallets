const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getDecodeAuth, base_url, chain_name } = require("./services/data")

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});


router.get('/get-info', async(req, res) => {
  var payload = {
    "method" : "getinfo",
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
      return res.status(200).send({ status: "success", message: "Get Assets Successfully 😀", data: result.data.result })
  }).catch((err) => {
      return err.response;
  });
});

router.use('/streams', require("./streams"));
router.use('/permissions', require("./permissions"));
router.use('/transactions', require("./transactions"));
router.use('/addresses', require("./addresses"));
router.use('/assets', require("./assets"));

module.exports = router;
