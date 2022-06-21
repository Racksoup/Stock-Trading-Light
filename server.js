const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(express.json({ extend: false }));

app.use('/api/stock-trading-light', require('./routes/api/stockTradingLight'));

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//axios.get('http://localhost:8080/api/stock-trading-light/yahoo');

let f = 0;
const timeoutFunc = () => {
  setTimeout(() => {
    const date = new Date();
    if (date.getHours() === 9 && date.getMinutes() === 30 && date.getSeconds() <= 1) {
      axios.get(`http://localhost:${PORT}/api/stock-trading-light/market`);
    }
    if (date.getHours() === 16 && date.getMinutes() === 00 && date.getSeconds() <= 1) {
      axios.get(`http://localhost:${PORT}/api/stock-trading-light/market`);
    }
    timeoutFunc();

    axios.put(`http://localhost:${PORT}/api/stock-trading-light/light`);
  }, 1000);
};

axios.get(`http://localhost:${PORT}/api/stock-trading-light/market`);

timeoutFunc();
