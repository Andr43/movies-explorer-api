const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const router = require('./routes/index');
const cookieParser = require('cookie-parser');

mongoose.connect('mongodb://127.0.0.1/projectmoviesdb', {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
