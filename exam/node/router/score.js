const express = require('../public/config').express;
const router = express.Router();
const QuestionModel = require('../models/question');
const scoreModel = require('../models/score');
let resData;

router.use(function (req, res, next) {
    resData = {
        code: 0,
        message: '',
        err: ''
    }
    page = {
        skip: 0
    }
    next();
})

router.post('/mark', (req, res) => {
    let score = 0;
    QuestionModel.find({ _id: { $in: Object.keys(req.body.questions) } }, null, (err, docs) => {
        console.log(docs);
        if (err) {
            resData = { code: 1, message: 'data error', err: err };
        }
        docs.forEach((val) => {
            if (compareAnswer(val, req.body.questions[val._id])) {
                score += 1;
            }
        })
        console.log(score);
        scoreModel.create({
            examName: req.body.examName,
            userName: req.body.userName,
            score: score,
            date: req.body.date
        }, (err, doc) => {
            if (err) {
                resData = { code: 1, message: 'add new data error' }
            } else {
                doc ? resData = { code: 0, message: 'add new mark success', score: score, userInfo: doc } : { code: 2, message: 'add new mark failed', userInfo: null }
            }
            res.send(resData);
            return;
        })
    })
})

function compareAnswer(doc, question) {
    if (doc.type === 1) {
        console.log('Multiple', doc.questionName);
        console.log('Database->', doc.answer);
        console.log('Form->', question);
        return reduceFn(doc.answer) === reduceFn(question)
    } else {
        console.log('Single', doc.questionName);
        console.log('Database->', doc.answer);
        console.log('Form->', question);
        return reduceFn(doc.answer) === question
    }
}

function reduceFn(doc) {
    return doc.reduce((accumulator, currentValue) => accumulator + currentValue);
}


module.exports = router;