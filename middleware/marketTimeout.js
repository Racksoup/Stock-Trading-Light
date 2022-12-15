const axios = require('axios');
const PORT = process.env.PORT || 4200;

const marketTimeout = () => {
  setTimeout(() => {
    const date = new Date();
    if (date.getHours() === 9 && date.getMinutes() === 30 && date.getSeconds() <= 19) {
      axios.get(`http://localhost:${PORT}/api/stock-trading-light/market`);
    }
    if (date.getHours() === 16 && date.getMinutes() === 00 && date.getSeconds() <= 19) {
      axios.get(`http://localhost:${PORT}/api/stock-trading-light/market`);
    }

    axios.put(`http://localhost:${PORT}/api/stock-trading-light/light`);
    marketTimeout();
  }, 10000);
};

module.exports = { marketTimeout };
