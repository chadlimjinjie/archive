const express = require('express');
const path = require('path');
const multer = require('multer');

const authenticateToken = require('/home/runner/api/routes/api/auth/authenticateToken');
const Post = require('/home/runner/api/models/post');
const Media = require('/home/runner/api/models/media');

const router = express.Router();

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'assets/private/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  }
});

const upload = multer({ storage: storage });
Post.watch().on('insert', data => {
  console.log(data);
});

router.get('', async (req, res) => {
  const { post_id } = req.query;
  const post = await Post.findOne({
    _id: post_id
  }).populate({
    path: 'user',
    select: 'username'
  });
  // console.log(post);
  res.send({
    status: 200,
    result: post
  });
});

router.post('/create', [authenticateToken, upload.array('file', 12)], async (req, res) => {
  let mediaArray = [];
  const { content } = req.body;
  const { files } = req;
  console.log(files);
  const { _id } = req.user;
  // console.log(req.user);

  try {
    if (files) {
      for (file of files) {
        console.log(file);
        let mediaFile = new Media({
          filename: file.filename
        });
        if (file.mimetype.includes("image")) mediaFile.mediaType = 1;
        if (file.mimetype.includes("video")) mediaFile.mediaType = 2;
        await Media.create(mediaFile);
        mediaArray.push(mediaFile);
      }
    }
    const post = await Post.create({
      user: _id,
      content,
      media: mediaArray
    });
    res.send({
      status: 200,
      result: post
    });
  } catch (e) {
    res.send(e);
  }
});

router.post('/delete', authenticateToken, async (req, res) => {
  const { post_id } = req.body;
  // console.log(req.user);
  const { _id } = req.user;
  try {
    const post = await Post.deleteOne({ _id: post_id, user: _id });
    // console.log(post);
    res.send({
      status: 200,
      result: post
    });
  } catch (e) {
    res.send({
      status: 400,
      result: e
    });
  }
});

// ?pageNo=1&pageSize=20
router.get('/list', async (req, res) => {
  const { pageNo, pageSize } = req.query;
  const posts = await Post.find({
    post: null
  }).sort([['createdAt', -1]]).populate({
    path: 'user',
    select: 'username avatar'
  }).populate({
    path: 'media'
  });
  // console.log(posts);
  res.send({
    status:  200,
    result: posts
  });
});

module.exports = router;