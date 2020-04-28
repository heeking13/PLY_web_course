const express = require('../public/config').express;
const router = express.Router();
const UserModel = require("../models/user");

router.post('/login', (req, res) => {
    console.log(req.body);

    //console.log('user login pass');
    //res.send({ code: 0, message: 'user login information' });
    UserModel.findOneAndUpdate({ username: req.body.username, password: req.body.password },
        { $inc: { 'loginCount': 1 }, lastTime: new Date().getTime() },
        { new: true, fields: 'username sex _id info auth' },
        function (err, doc) {
            if (err) {
                resData = ({ code: 1, message: 'query error' });
            } else {
                doc ? resData = { code: 0, message: 'query success', userInfo: doc } : resData = { code: 2, message: 'username or password wrong', userInfo: doc };
            }
            res.send(resData);
            return;
        });
})

router.post('/getOneUserById', (req, res) => {
    console.log(req.body);
    UserModel.findById({ _id: req.body.id }, function (err, doc) {
        if (err) {
            resData = ({ code: 1, message: 'query error' });
        } else {
            doc ? resData = { code: 0, message: 'query success', userInfo: doc } : resData = { code: 2, message: 'username or password wrong', userInfo: doc };
        }
        res.send(resData);
        return;
    });

})

router.post('/editUser', (req, res) => {
    console.log(req.body);

    //console.log('user login pass');
    //res.send({ code: 0, message: 'user login information' });
    UserModel.findOneAndUpdate({ _id: req.body._id },
        { sex: req.body.sex, password: req.body.password, info: req.body.info },
        { new: true, fields: 'username sex _id info auth exam password' },
        function (err, doc) {
            if (err) {
                resData = ({ code: 1, message: 'edit error' });
            } else {
                doc ? resData = { code: 0, message: 'edit success', userInfo: doc } : resData = { code: 2, message: 'user does not exit', userInfo: doc };
            }
            res.send(resData);
            return;
        });
})

module.exports = router;