const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const login = require('./routes/login');
const checkjwt = require('./routes/checkJWT');
const annonces = require("./routes/annonces");
const rooms = require('./routes/rooms');
const paiement = require('./routes/paiement');
const authentication = require("./middleware/authentication");

const cors = require('cors');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/login', login);
app.use('/checkjwt', authentication, checkjwt);
app.use('/home', annonces);
app.use('/rooms', rooms);
app.use('/paiements', authentication, paiement);


app.use('/', authentication, indexRouter);
module.exports = app;
