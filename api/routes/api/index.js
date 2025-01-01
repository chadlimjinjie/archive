const express = require('express');

const router = express.Router();

router.use('/asset', require('./asset'));
router.use('/chad', require('./chad'));
// router.use('/queue', require('./queue'));
router.use('/upload', require('./upload'));
router.use('/auth', require('./auth'));
// router.use('/crypto-org', require('./crypto-org'));
// router.use('/crypto-pay', require('./crypto-pay'));
router.use('/disney', require('./disney'));
router.use('/discord-webhook', require('./discord-webhook'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));

router.get('', (req, res) => {
  res.sendStatus(200);
});

router.get('/time', async (req, res) => {
  // console.log(req);
  const date = new Date();
  res.send({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

module.exports = router;