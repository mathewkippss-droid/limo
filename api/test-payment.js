const axios = require('axios');

const config = {
  method: 'POST',
  url: 'https://backend.payhero.co.ke/api/v2/payments',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic YOUR_AUTH_TOKEN',
  }
,
  data: {
  "amount": 100,
  "phone_number": "0787677676",
  "channel_id": 133,
  "provider": "m-pesa",
  "external_reference": "INV-009",
  "customer_name": "John Doe",
  "callback_url": "https://example.com/callback.php"
}
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
