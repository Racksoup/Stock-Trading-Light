const express = require('express');
const router = express.Router();
const axios = require('axios');

let marketState = '"CLOSED"';
//
//
//
// Turn Light On
router.put('/', async (req, res) => {
  try {
    await axios.put(
      `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/1/state`,
      { on: true, hue: 29000, bri: 235 }
    );
    console.log('Light Turned On');
  } catch (error) {
    console.log(error);
  }
});
//
//
//
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
      return JSON.stringify(res.data.marketSummaryAndSparkResponse.result[0].marketState);
    })
    .catch((err) => {
      console.error(err);
    });
});
//
//
//
// Turn Light On /Off if Market Open/Closed
router.put('/light', async (req, res) => {
  try {
    if (marketState === '"OPEN"' || marketState === '"REGULAR"') {
      await axios.put(
        `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/1/state`,
        { on: true, hue: 29000, bri: 235 }
      );
      console.log('Light Turned Green');
    }
    if (marketState === '"CLOSED"' || marketState === '"POST"') {
      await axios.put(
        `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/1/state`,
        { on: true, hue: 00000, bri: 85 }
      );
      console.log('Light Turned Red');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
