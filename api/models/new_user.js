const mongoose = require('mongoose');

const newUserSchema = new mongoose.Schema({
  avatar: { type: String, default: '' },
  username: { type: String, lowercase: true, required: true, unique: true },
  email: { type: String, lowercase: true, required: true, unique: true },
  roles: [{ type: mongoose.ObjectId, required: false, ref: 'Role' }],
  hash: { type: String, required: true, unique: true },
}, {
  timestamps: true
});

const NewUser = mongoose.model('NewUser', newUserSchema);

module.exports = NewUser;