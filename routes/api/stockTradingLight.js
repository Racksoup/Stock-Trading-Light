const express = require('express');
const router = express.Router();
const axios = require('axios');

let marketState = '';

// Get Market Open/Close State
router.get('/market', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/market/v2/get-summary',
    params: { region: 'US' },
    headers: {
      'X-RapidAPI-Key': '6ba3d17310msh5824273b3ee6e9fp123745jsnf6597ce057d7',
      'x-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
    },
  };
  marketState = await axios
    .request(options)
    .then((res) => {
      let nasState;
      res.data.marketSummaryAndSparkResponse.result.map((data) => {
        if (data.fullExchangeName === 'Nasdaq GIDS') {
          nasState = JSON.stringify(data.marketState);
        }
      });
      return nasState;
    })
    .catch((err) => {
      process.on('uncaughtException', (err) => {
        console.log(err);
      });
    });
});

// Turn Light On / Off if Market Open / Closed
let j = 0;
router.put('/light', async (req, res) => {
  const date = new Date();
  try {
    if (marketState === '"OPEN"' || marketState === '"REGULAR"') {
      await axios.put(
        `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/1/state`,
        { on: true, hue: 29000, bri: 235 }
      );
      console.log(
        `Light Turned Green - ${j} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      );
      j++;
    }
    if (marketState === '"CLOSED"' || marketState === '"POST"' || marketState === '"POSTPOST"') {
      await axios.put(
        `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/1/state`,
        { on: true, hue: 00000, bri: 85 }
      );
      console.log(
        `Light Turned Red - ${j} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      );
      j++;
    }
  } catch (error) {
    process.on('uncaughtException', (err) => {
      console.log(err);
    });
  }
});

module.exports = router;
