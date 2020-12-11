const express = require('express');
const port = 5000;
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require('../models/user');
require('../models/sensor');
//require('../models/sensor');
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log('mongo is connected');
});
mongoose.connection.on('error',(err)=>{
    console.log('error connecting',err);
});
mongoose.model('User');
app.use(require('../routes/auth'));
app.use(require('../routes/temp'));
app.listen(port,()=>{
console.log(`this app is listening to port ${port}`);
});