require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

port=process.env.PORT || 3000;
host=process.env.HOST || "localhost";

mongoose.connect(`${process.env.mongodb}/gallery`);

app.get("/api/health", function(req, res){
    res.send(`Backend server is status: active at time: ${new Date()}`);
})

app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log(`listening on http://${host}:${port}`);
    }
})