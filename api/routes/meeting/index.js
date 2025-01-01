const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let meetingList = [];

router.get('', (req, res) => {
  meetingList.push({
    id: uuidv4(),
    peer_id: uuidv4()
  });
  res.sendStatus(200);
});

router.get('/create', (req, res) => {
  res.sendStatus(200);
});

router.post('', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;