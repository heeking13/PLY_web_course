//mongodb configure file
module.exports.mongoose = require('mongoose');
module.exports.url = process.env.MONGODB_URI || '127.0.0.1:27017';
module.exports.express = require('express');
