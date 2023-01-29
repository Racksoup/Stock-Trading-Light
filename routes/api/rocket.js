const express = require('express');
const router = express.Router();
const axios = require('axios');
const PORT = process.env.PORT || 42001;

rocketData = [];

// Get Rocket Data
router.get('/get-data', async (req, res) => {
  try {
    res = await axios.get(`https://fdo.rocketlaunch.live/json/launches/next/5`);
    rocketData = res.data.result.map((x, i) => {
      return x.win_open;
    });
  } catch (error) {
    console.log(error);
  }
});

// Change Light Color
router.put('/light/:hue', async (req, res) => {
  const hue_inc = parseInt(req.params.hue);
  console.log(hue_inc);
  try {
    await axios.put(
      `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/1/state`,
      { on: true, hue_inc, bri: 235 }
    );
  } catch (error) {
    process.on('uncaughtException', (err) => {
      console.log(err);
    });
  }
});

module.exports = router;
