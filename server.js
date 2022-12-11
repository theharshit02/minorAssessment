//packages

require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const admin = require("./Routes/admin")
const bodyParser = require("body-parser")
const discover = require("./Routes/discover")


app.use(bodyParser.urlencoded({extended: true}));

//connection port and host

port=process.env.PORT || 3000;
host=process.env.HOST || "localhost";


//mongodb connection and initialization

mongoose.connect(`${process.env.mongodb}/assessment`);


//api callings

app.get("/api/health", function(req, res){
    res.send(`Backend server is status: active at time: ${new Date()}`);
})


//routing

app.use("/api/admin", admin);
app.use("/api/discover", discover);

//creating error and calling error handler

app.use(function(req, res, next){
    const err = new Error("Something went wrong! Please try after some time.");
    err.status = 404;
    next(err);
})


//error handling

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})


//creating server

app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log(`listening on http://${host}:${port}`);
    }
})