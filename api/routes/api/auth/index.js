const express = require('express');

const router = express.Router();

router.use('/login', require('./login'));
router.use('/register', require('./register'));

router.get('', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;