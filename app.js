const express = require('express');
const {AuthRoutes} = require('./routers/authRoutes');
const {ModelRoutes} = require('./routers/modelRoutes');
const {mongoUrl}  = require('./keys');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());


// const mongoUrl = 'mongodb+srv://praveen:praveen@cluster0.hromh.mongodb.net/centralData';


app.listen(4000,() => {
    console.log('Server Was Running On The Port : 4000');
    mongoose.connect(mongoUrl,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(res=>{
        console.log('Connected To Mongo Server');
        mongoose.connection.on('error',(err)=>{
            console.log(res);
        });
    }).catch((err) =>{
        console.log('Not Connected To Mongo Server');
    });
});

app.use(AuthRoutes);
app.use(ModelRoutes);
