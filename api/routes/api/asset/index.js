const express = require('express');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

const authenticateToken = require('/home/runner/api/routes/api/auth/authenticateToken');

const router = express.Router();

router.get('/list', authenticateToken, (req, res) => {
  const { pageNo, pageSize } = req.query;
  fs.readdir('assets/private/', (err, files) => {
    files = files.reverse().map(file => {
      if (mime.lookup(file)) {
        // console.log(mime.lookup(file).split('/')[0]);
        file = { file, type: mime.lookup(file).split('/')[0] };
      }
      return file;
    });
    totalRecords = files.length;
    if (pageNo || pageSize) {
      if (pageNo <= 0) {
        files = [];
      } else {
        files = files.slice(pageNo * pageSize - 10, pageNo * pageSize - 1);
      }
      // console.log(pageNo, pageSize);
      // console.log(pageNo * pageSize - 10, pageNo * pageSize - 1);
      // console.log(files);
    }
    res.send({ totalRecords, files });
  });
});

router.get('/:file_name', authenticateToken, (req, res) => {
  const { file_name } = req.params;
  // console.log(file_name);
  // if (!file_name) {
  //   res.sendStatus(404);
  //   return;
  // }
  res.sendFile(path.join(__basedir, 'assets', 'private', file_name));
});

module.exports = router;