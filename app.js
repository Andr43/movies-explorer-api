require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, DB, NODE_ENV } = process.env;
const app = express();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { DB_DEV } = require('./utils/config');
const router = require('./routes/index');
const { limiter } = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/corsHandler');
const { centralErrorHandler } = require('./errors/handlers/central-error-handler');

mongoose.connect(NODE_ENV === 'production' ? DB : DB_DEV, {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(helmet());
app.use(corsHandler);
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
