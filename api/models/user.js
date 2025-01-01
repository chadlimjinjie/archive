const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  avatar: { type: String, default: '' },
  username: { type: String, lowercase: true, required: true, unique: true },
  email: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: mongoose.ObjectId, required: false, ref: 'Role' }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;