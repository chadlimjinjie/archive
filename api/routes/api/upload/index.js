const express = require('express');
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'assets/private/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('', (req, res) => {
  res.sendStatus(200);
});

router.post('', upload.array('file', 12), function(req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  // console.log(req.files);
  res.sendStatus(200);
})

module.exports = router;