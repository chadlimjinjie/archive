const mongoose = require('mongoose');

const switchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  device_id: { type: String, required: true },
  local_key: { type: String, required: true },
  dp_id: { type: String, required: true },
  checked: { type: Boolean, default: false },
});

switchSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

switchSchema.set('toJSON', {
  virtuals: true
});

const Switch = mongoose.model('Switch', switchSchema);

module.exports = Switch;