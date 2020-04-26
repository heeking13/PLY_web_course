const express = require('../public/config').express;
const router = express.Router();

router.post('/login', (req, res) => {
    console.log(req.body);

    console.log('admin login pass');
    res.send({ code: 0, message: 'admin login information' });
})

module.exports = router;