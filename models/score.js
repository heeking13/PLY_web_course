const mongoose = require('../public/config').mongoose;
const url = require('../public/config').url;


mongoose.connect(process.env.MONGODB_URI || 'mongodb://heeking13:111222hq@ds231517.mlab.com:31517/heroku_l1z5p2dp', { useNewUrlParser: true }).then(() => {
    console.log('mongodb connect successfully');
}, (err) => {
    console.log(err);
})


const scoreSchema = require('../scheams/score');
module.exports = mongoose.model('score', scoreSchema, 'score');