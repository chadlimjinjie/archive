const express = require('express');
const TuyAPI = require('tuyapi');

const Switch = require('../../models/switch');

const router = express.Router();

router.get('', (req, res) => {
  const { id, device_id } = req.query;
  Switch.find({ id: id, device_id: device_id }, function(err, result) {
    if (err) return;
    
    let device = new TuyAPI({
      id: result[0].device_id,
      key: result[0].local_key,
      ip: 'home.chadlim.tech',
      port: 8101,
      version: '3.3',
      issueGetOnConnect: false,
    });
    
    (async () => {
      await device.find();

      await device.connect();

      let status = await device.get({ schema: true });

      console.log('Current status:', status);

      device.disconnect();

      res.send(status);
    })();
    
  });
});

router.get('/list', (req, res) => {
  let deviceList = [];
  Switch.find({}, async function(err, result) {
    for (const _switch of result) {
      await new Promise(resolve => {

        let device = new TuyAPI({
          id: _switch.device_id,
          key: _switch.local_key,
          ip: 'home.chadlim.tech',
          port: 8101,
          version: '3.3',
          issueGetOnConnect: false,
        });

        (async () => {
          await device.find();
          await device.connect();
          
          let status = await device.get({ schema: true });
          // console.log('Current status:', status);
          
          device.disconnect();
          status.id = _switch._id;
          status.name = _switch.name;
          status.dp_id = _switch.dp_id;
          status.checked = _switch.checked;
          
          deviceList.push(status);
          resolve(status);
        })();

      });
    }
    console.log(deviceList);
    res.send(deviceList);
    // res.send(result);
  });
});

router.post('/add', (req, res) => {
  const { name, device_id, device_key, dp_id } = req.body;
  Switch.create({ name: name, device_id: device_id, local_key: device_key, dp_id: dp_id }, function(err, result) {
    if (err) return;
    // console.log(result);
    res.send(result);
  });
});

router.put('/update', async (req, res) => {
  const { id, checked } = req.body;
  let _switch = await Switch.findOne({ id: id }).exec();
  console.log(_switch);
  if (!_switch) return res.sendStatus(404);
  Switch.updateOne({ id: id }, { checked: checked }, function(err, result) {
    // Updated at most one doc, `res.nModified` contains the number
    // of docs that MongoDB updated

    let device = new TuyAPI({
      id: _switch.device_id,
      key: _switch.local_key,
      ip: 'home.chadlim.tech',
      port: 8101,
      version: '3.3',
      issueGetOnConnect: false,
    });
    
    setTimeout(() => { device.disconnect(); }, 10000);
    
    device.find().then(() => {
      // Connect to device
      device.connect();
    });

    // Add event listeners
    device.on('connected', () => {
      console.log('Connected to device!');
      device.set({ dps: _switch.dp_id, set: checked });
    });
    
    device.on('disconnected', () => {
      console.log('Disconnected from device.');
    });
    
    device.on('error', error => {
      console.log('Error!', error);
      device.disconnect();
    });
    
    device.on('data', data => {
      console.log('Data from device:', data);
      device.disconnect();
    });
    
    res.send(result);
  });
});

router.put('/delete', (req, res) => {
  const { id } = req.body;
  Switch.deleteOne({ id: id }, function(err) {
    if (err) return;
    // deleted at most one document
  });
});

module.exports = router;