const express = require('express');

const authenticateToken = require('/home/runner/api/routes/api/auth/authenticateToken');
// const Comment = require('/home/runner/api/models/comment');
const Post = require('/home/runner/api/models/post');

const router = express.Router();

router.get('', (req, res) => {
  res.sendStatus(200);
});

router.post('/create', authenticateToken, async (req, res) => {
  const { post_id, content } = req.body;
  // console.log(req.user);
  const { _id } = req.user;
  try {
    let comment = await Post.create({
      post: post_id,
      user: _id,
      content
    });
    comment = await comment.populate({
      path: 'user',
      select: 'avatar username'
    });
    res.send({
      status: 200,
      result: comment
    });
  } catch (e) {
    res.send(e);
  }
});

// ?pageNo=1&pageSize=20
router.get('/list', async (req, res) => {
  const { pageNo, pageSize, post_id } = req.query;
  if (!post_id) return res.send([]);
  const posts = await Post.find({
    post: post_id
  }).sort([['createdAt', -1]]).populate({
    path: 'user',
    select: 'username avatar'
  }).populate({
    path: 'post',
    // match: { _id: post_id },
    select: 'user content createdAt'
  });
  res.send({
    status:  200,
    result: posts
  });
});

module.exports = router;