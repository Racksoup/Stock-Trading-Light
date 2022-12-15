const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const { marketTimeout } = require('./middleware/marketTimeout');

dotenv.config();

const app = express();

app.use(express.json({ extend: false }));

app.use('/api/stock-trading-light', require('./routes/api/stockTradingLight'));
app.use('/api/rocket', require('./routes/api/rocket'));

const PORT = process.env.PORT || 4200;

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log('Node NOT Exiting...');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

axios.get(`http://localhost:${PORT}/api/stock-trading-light/market`);
axios.get(`http://localhost:${PORT}/api/rocket/get-data`);

marketTimeout();
