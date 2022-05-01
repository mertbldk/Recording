//Packets
const express = require('express');
const mongoose = require("mongoose");
const router = require('./router/router');
const bodyParser = require("body-parser");

//Packets Code
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
const url = "mongodb+srv://Admin:admin123@cluster0.muzlb.mongodb.net/Node_Mongo?retryWrites=true&w=majority";
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>app.listen('3000',console.log('3000 portu çalıştı.')))
    .catch((e)=>console.log('3000 portu çalışmadı.' +  " " + e))

app.use(router);