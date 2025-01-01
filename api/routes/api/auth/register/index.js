const express = require('express');
const bcrypt = require('bcrypt');

const User = require('/home/runner/api/models/user');

const router = express.Router();
const saltRounds = 10;

router.get('', (req, res) => {
  res.sendStatus(200);
});

router.post('', async (req, res) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    // console.log(salt, hash);
    const user = await User.create({ username, email, password: hash });
    // console.log(user);
    res.send({
      status: 200,
      result: user
    });
  } catch (e) {
    console.log(e);
    // console.log(e.message);
    switch (e.code) {
      case 11000:
        break;
    }
    res.send({
      status: 400,
      error: e
    });
  }
});

module.exports = router;