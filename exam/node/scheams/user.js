const mongoose = require('../public/config').mongoose;

//user structure
module.exports = new mongoose.Schema({

    username: String,
    password: {
        type: String
    },
    sex: {
        type: Number
    },
    info: {
        type: String
    },
    exam: {
        type: Array,
        default: []
    },
    loginCount: {
        type: Number,
        default: 0
    },
    lastTime: {
        type: Number,
        default: new Date().getTime()
    },
    key: {
        type: String
    }
})