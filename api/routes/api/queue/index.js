const express = require('express');
var cron = require('node-cron');

const router = express.Router();

var queue = [];

router.get('', (req, res) => {
  const {seconds, redirect, replace} = req.query;
  if (seconds) {
    setTimeout(() => {redirect ? res.redirect(redirect) : res.sendStatus(200)}, seconds);
  } else {
    queue.push({req, res, redirect});
  }
});

router.get('/info', (req, res) => {
  res.json({
    queueLength: queue.length,
    // waitTime: (queue.length / 10) * 10
  });
});

router.get('/find', (req, res) => {
  // console.log(req.headers['x-forwarded-for']);
  found = queue.find(item => {return item.req.headers['x-forwarded-for'] === req.headers['x-forwarded-for']});
  foundIndex = queue.findIndex(item => {return item.req.headers['x-forwarded-for'] === req.headers['x-forwarded-for']});
  if (found) {
    // res.send('Already in queue position ' + foundIndex + 1);
    res.json({
      position: foundIndex + 1,
      peopleInfront: foundIndex,
      queueLength: queue.length,
    });
  } else {
    res.sendStatus(404);
  }
});

cron.schedule('*/10 * * * * *', () => {
  // console.log('running a task every minute');
  // console.log(queue.length);
  if (queue.length > 0) {
    queue.slice(0, 10).forEach((item) => {
      if (item.redirect) {
        queue.shift().res.redirect(item.redirect);
      } else {
        queue.shift().res.sendStatus(200);
      }
    });
    
    // console.log(queue.length);
  }
});

module.exports = router;