var jwt = require('jsonwebtoken');

// https://www.youtube.com/watch?v=mbsmsi7l3r4
module.exports = function authenticateToken(req, res, next) {
  const { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) return res.send({
    status: 401,
    result: {
      valid: false
    }
  });
  const token = authorization.split(" ")[1];
  if (!token) return res.send({
    status: 401,
    result: {
      valid: false
    }
  });
  jwt.verify(token, 'supersecret', (err, payload) => {
    // console.log(payload);
    if (err) return res.send({
      status: 403,
      result: {
        valid: false
      }
    });
    req.user = payload;
    next();
  });
}
