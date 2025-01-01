const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  mediaType: { type: Number, required: true }
}, {
  timestamps: true
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;