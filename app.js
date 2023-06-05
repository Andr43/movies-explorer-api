const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/corsHandler');
const { centralErrorHandler } = require('./errors/handlers/central-error-handler');
const { errors } = require('celebrate');

mongoose.connect('mongodb://127.0.0.1/projectmoviesdb', {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(cookieParser());
app.use(corsHandler);
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
