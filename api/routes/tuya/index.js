const express = require('express');
// const { TuyaContext } = require('@tuya/tuya-connector-nodejs');
// https://codetheweb.github.io/tuyapi/
const TuyAPI = require('tuyapi');

const router = express.Router();

router.put('', (req, res) => {
  const device = new TuyAPI({
    id: '702800237c87ce921162',
    key: '260b030f3036fcef',
    ip: '116.87.34.242',
    port: '',
    version: '3.3',
    issueGetOnConnect: false,
    // issueRefreshOnConnect: true
  });
  const { dps } = req.body;
  console.log(!dps);
  if (!dps) {
    return res.sendStatus(404);
  }

  (async () => {
    await device.find();

    await device.connect();

    let status = await device.get({ schema: true });

    console.log('Current status:', status);

    // console.log(`Current status: ${status}.`);

    console.log(!status.dps[dps.toString()]);
    await device.set({ dps: dps.toString(), set: !status.dps[dps.toString()] });

    status = await device.get({ schema: true });

    // console.log(`New status: ${status}.`);
    console.log('New status:', status);

    device.disconnect();
    res.sendStatus(200);
  })();

});

module.exports = router;