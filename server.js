require('dotenv').config();
const express = require("express");
const app = express();

port=process.env.PORT || 3000;
host=process.env.HOST || "localhost";


app.get("/", function(req, res){
    res.send("hello");
})

app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("listening on http://" + host + ":" + port);
    }
})