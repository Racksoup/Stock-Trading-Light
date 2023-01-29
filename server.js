const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const { marketTimeout } = require('./middleware/stock');
const { rocketLoop, getRocketData } = require('./middleware/rocket');

dotenv.config();

const app = express();

app.use(express.json({ extend: false }));

app.use('/api/stock-trading-light', require('./routes/api/stockTradingLight'));
app.use('/api/rocket', require('./routes/api/rocket'));

const PORT = process.env.PORT || 42001;

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log('Node NOT Exiting...');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// axios.get(`http://localhost:${PORT}/api/stock-trading-light/market`);
// marketTimeout();

getRocketData();
rocketLoop();
