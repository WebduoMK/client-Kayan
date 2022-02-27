const express = require('express');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const apiRoutes = require('./routes/api');
const cors = require('cors');
require('dotenv').config();
const app = express();
// Routes

const PORT = process.env.NODE_PORT || 5000;

app.use(express.json());

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.use(cors(corsOptions));

app.use(userRoutes);
app.use(accountRoutes);
app.use(apiRoutes);

app.get('/', (req, res) => {
  return res.json({ project: 'Kayan' });
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
