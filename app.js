const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routers/router');

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api',router);

// Error handlers should be registered after routes.
app.use(errorHandler);

module.exports = app;