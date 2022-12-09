//packages

require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");


//connection port and host

port=process.env.PORT || 3000;
host=process.env.HOST || "localhost";


//mongodb connection and initialization

mongoose.connect(`${process.env.mongodb}/assessment`);

const galleryCategorySchema = mongoose.Schema({
    name: String,
    createdAt: Date,
    updatedAt: Date
})

const imagesGallerySchema = mongoose.Schema({
    name: String,
    createdAt: Date,
    updatedAt: Date,
    category: Array,
    likes: Number,
    imageLink: String
})

const galleryCategory = mongoose.model("GalleryCategory", galleryCategorySchema);
const imagesGallery = mongoose.model("ImagesGallery", imagesGallerySchema);


//api callings

app.get("/api/health", function(req, res){
    res.send(`Backend server is status: active at time: ${new Date()}`);
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