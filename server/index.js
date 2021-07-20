const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const connect = require('./schemas');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var emailRouter = require('./routes/email');


app.use('/',indexRouter);
app.use('/users',usersRouter);
app.use('/auth',authRouter);
app.use('/email',emailRouter)



      
connect();
    

app.listen(port,() => console.log(`port ${port} is running ~ `));
