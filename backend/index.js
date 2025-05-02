// index.js

require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const fetch = require('node-fetch');

const app = express();
app.use(express.json()); // to parse JSON bodies

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.get('/', (req, res) => {
    res.send('<h1>Server Is Running</h1>');
  });  

// Optional: Create a new Verify service (you can call this once to generate a new service)
app.get('/create-service', async (req, res) => {
  try {
    const service = await client.verify.v2.services.create({
      friendlyName: 'My First Verify Service',
    });
    res.json({ sid: service.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a verification code
app.post('/send-verification', async (req, res) => {
  const { to } = req.body;
  try {
    const verification = await client.verify.v2
      .services(process.env.VERIFY_SERVICE_SID)
      .verifications.create({
        channel: 'sms',
        to,
      });
    res.json({ status: verification.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check verification code
app.post('/check-verification', async (req, res) => {
  const { to, code } = req.body;
  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to,
        code,
      });
    res.json({ status: verificationCheck.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//

app.post('/send-topup', async (req, res) => {
    const { operatorId, amount, recipientPhone, senderPhone, recipientEmail } = req.body;
  
    const url = 'https://topups-sandbox.reloadly.com/topups';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/com.reloadly.topups-v1+json',
        Authorization: `Bearer ${process.env.RELOADLY_AUTH_TOKEN}`
      },
      body: JSON.stringify({
        operatorId: operatorId || '535',
        amount: amount || '5.00',
        useLocalAmount: true,
        customIdentifier: 'This is example identifier 130',
        recipientEmail: recipientEmail || 'peter@nauta.com.cu',
        recipientPhone: recipientPhone || { countryCode: 'GB', number: '447951731337' },
        senderPhone: senderPhone || { countryCode: 'CA', number: '11231231231' }
      })
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
