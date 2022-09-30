const express = require('express');
const router = express.Router();
const axios = require('axios');

let rocketData = [];

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
router.put('/light', async (req, res) => {
  try {
    console.log(req.body);
    // await axios.put(
    //   `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/1/state`,
    //   { on: true, hue: 29000, bri: 235 }
    // );
  } catch (error) {
    process.on('uncaughtException', (err) => {
      console.log(err);
    });
  }
});

const rocketTimeout = () => {
  const date = new Date();
  rocketData.map((x) => console.log(new Date(x).getTime()));
};

setTimeout(() => {
  rocketTimeout();
}, 2000);
module.exports = router;
