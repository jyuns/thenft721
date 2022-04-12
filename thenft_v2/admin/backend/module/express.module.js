const { node } = require('../config');

const express = require('express');
const routes = require('../index.route');
const cors = require('cors');
const white_list = node.white_list;
const corsOptions = { origin: white_list, credentials: true }

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', routes);

module.exports = app;