//packages

require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const admin = require("./Routes/admin")

//connection port and host

port=process.env.PORT || 3000;
host=process.env.HOST || "localhost";


//mongodb connection and initialization

mongoose.connect(`${process.env.mongodb}/assessment`);

const galleryCategorySchema = mongoose.Schema({
    name: String
}, {timestamps: true});

const imagesGallerySchema = mongoose.Schema({
    name: String,
    category: Array,
    likes: Number,
    imageLink: String
}, {timestamps: true});

const galleryCategory = mongoose.model("GalleryCategory", galleryCategorySchema);
const imagesGallery = mongoose.model("ImagesGallery", imagesGallerySchema);


//api callings

app.get("/api/health", function(req, res){
    res.send(`Backend server is status: active at time: ${new Date()}`);
})

app.use("/api/admin", admin);

//creating server

app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log(`listening on http://${host}:${port}`);
    }
})