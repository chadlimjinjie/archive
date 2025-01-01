const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('', (req, res) => {
  res.sendStatus(200);
});

const proxy = {
  proxy: 'https://47.74.226.8:5001'
}

router.post('', (req, res) => {
  const { embeds } = req.body;
  if (embeds) {
    req.body.embeds = JSON.parse(`[${embeds}]`.replace('}\n{', '},{'));
  }
  console.log(req.body);
  axios.post('https://discord.com/api/webhooks/954685496573952000/13lqmz5moC3y_ARHc0KEjtaee2tnAugY7r2E356-S_KHfRonEJbDgTcJoMP2E9tE1AvP', req.body)
  .then(response => {
    console.log(response.data);
    res.send(response);
  }).catch(error => {
    console.log(error);
    res.send(error);
  });
});

module.exports = router;