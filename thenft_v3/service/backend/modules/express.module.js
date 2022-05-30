const { node } = require('../config');

const express = require('express');
const routes = require('../routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', routes);

module.exports = app;