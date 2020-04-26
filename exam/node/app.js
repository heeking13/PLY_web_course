const express = require('./public/config').express;

const cors = require('cors');
const bodyParser = require('body-parser');
const app = new express();

app.use(cors({
    allowedHeaders: 'Origin,x-requested-with,Content-Type,x-access-token',
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up router
app.use('/admin', require('./router/admin'));
app.use('/user', require('./router/user'));

app.listen(8081);