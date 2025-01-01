const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const authenticateToken = require('/home/runner/api/routes/api/auth/authenticateToken');
const User = require('/home/runner/api/models/user');

const router = express.Router();

router.get('', (req, res) => {
  res.sendStatus(200);
});

router.post('', async (req, res) => {
  // console.log(req.body);
  let { username, email, password } = req.body;
  const user = await User.findOne({
    $or: [
      { username },
      { email }
    ]
  }).exec();
  // console.log(user);
  if (!user) {
    return res.send({
      message: "User not found",
      status: 400
    });
  }
  if (!await bcrypt.compare(password, user.password)) {
    return res.send({
      message: "Wrong password",
      status: 400
    });
  }
  // , { expiresIn: 120 }
  console.log(user.toJSON());
  var token = jwt.sign(user.toJSON(), 'supersecret');
  console.log(token);
  // res.cookie("SESSIONID", token, { httpOnly: true, secure: true });
  res.json({
    result: {
      token
    },
    message: "",
    status: 200
  });
});

router.post('/verify', authenticateToken, async (req, res) => {
  res.send({
    status: 200,
    result: {
      valid: true
    }
  });
});

module.exports = router;