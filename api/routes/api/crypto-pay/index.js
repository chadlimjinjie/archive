const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('', (req, res) => {
  res.sendStatus(200);
});

router.post('/create-order', (req, res) => {
  const { payment_id } = req.body;
  axios.get(`https://pay.crypto.com/api/payments/${payment_id}`, {
    auth: {
      username: 'sk_test_dKS4ndo9FdX3rpKpAfGjTA1L:'
    }
  }).then(response => {
    // console.log(response.data);
    const { data, status } = response;
    // if (!data) return;
    switch (status) {
      case 200:
        switch (data.status) {
          case 'pending':
            
            break;
          case 'succeeded':
            
            break;
          case 'cancelled':
            
            break;
        }
        break;
    }
  });
});

module.exports = router;