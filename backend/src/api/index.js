const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/streams', require("./streams"));
router.use('/transactions', require("./transactions"));
router.use('/addresses', require("./addresses"));
router.use('/assets', require("./assets"));

module.exports = router;
