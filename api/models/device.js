const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  device_id: { type: String, required: true },
  local_key: { type: String, required: true },
});

deviceSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

deviceSchema.set('toJSON', {
  virtuals: true
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;