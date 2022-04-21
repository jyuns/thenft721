const { node } = require('../config');

const express = require('express');
const routes = require('../routes');
const cors = require('cors');
const white_list = node.white_list;
const corsOptions = { origin: white_list, credentials: true };
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api', routes);

module.exports = app;