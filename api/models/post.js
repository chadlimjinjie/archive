const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  post: { type: mongoose.ObjectId, required: false, ref: 'Post' },
  user: { type: mongoose.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  media: [{ type: mongoose.ObjectId, required: false, ref: 'Media' }],
  signature: { type: String, required: false }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;