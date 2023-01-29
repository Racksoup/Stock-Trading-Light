const axios = require('axios');
const { marketTimeout } = require('./stock');
const PORT = process.env.PORT || 42001;

// light sequence
const rocketSequence = () => {
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 2000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 3000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 4000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 5000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 6000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 7000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 8000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 9000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 10000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 11000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 12000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 13000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 14000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 15000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 16000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 17000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 18000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 19000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 20000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 21000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 22000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 23000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 24000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 17000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 25500);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 26000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 26500);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 27000);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 27500);
  setTimeout(() => {
    axios.put(`http://localhost:${PORT}/api/rocket/light/${17000}`);
  }, 28000);
  setTimeout(() => {
    marketTimeout();
  }, 33000);
};

// check if rocket times are equal to current time. if equal, start light sequence
const rocketLoop = () => {
  let date = Date.now();

  let waitToLoop = false;

  // check all rocket launch times
  rocketData.map((x) => {
    if (x !== null) {
      let launchTime = new Date(x).getTime();
      if (date <= launchTime - 20000 && date >= launchTime - 30000) {
        rocketSequence();
        waitToLoop = true;
      }
    }
  });

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

// get rocket data once per day
const getRocketData = () => {
  axios.get(`http://localhost:${PORT}/api/rocket/get-data`);

  setTimeout(() => {
    getRocketData();
  }, 86400);
};

module.exports = { rocketLoop, rocketSequence, getRocketData };
