const express = require('express');
const router = express.Router();
const axios = require('axios');
const PORT = process.env.PORT || 4200;

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
router.put('/light/:heu', async (req, res) => {
  try {
    await axios.put(
      `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/1/state`,
      { on: true, hue, bri: 235 }
    );
  } catch (error) {
    process.on('uncaughtException', (err) => {
      console.log(err);
    });
  }
});

// light sequence
const rocketSequence = () => {
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${5000}`);
  }, 2000);
};

// check if rocket times are equal to current time. if equal, start light sequence
const rocketLoop = () => {
  console.log(Date.now());

  let waitToLoop = false;
  if (Date.now() <= 1671010682000 - 30000 && Date.now() >= 1671010682000 - 40000) {
    rocketSequence();
    waitToLoop = true;
  }

  if (waitToLoop) {
    setTimeout(() => {
      rocketLoop();
    }, 20000);
  } else {
    setTimeout(() => {
      rocketLoop();
    }, 2000);
  }
};
setTimeout(() => {
  rocketLoop();
}, 2000);

// get rocket data once per day
setTimeout(() => {
  axios.get(`http://localhost:${PORT}/api/rocket/get-data`);
}, 86400);

module.exports = router;
