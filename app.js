const express = require('express');
dotenv.config();
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routers/router');

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);
app.use('/api',router);

module.exports = app;