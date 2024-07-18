const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRouter = require('./routes/user');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
