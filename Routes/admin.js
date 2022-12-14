const {Router} = require("express");
const route = Router();
const mongoose = require("mongoose");


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


//creating a new category

route.post("/categories/:category", function(req, res){
    var myobj = new galleryCategory(
        {name: req.params.category}
    )
    
    try{       
        galleryCategory.find({name: req.params.category}, function(err, result){
            if(err){
                console.log(err);
            }
            else{
                if(result.length !== 0){
                    console.log("Category already exist!! Enter a new category");
                }
                else{
                    if(myobj.save()){
                        console.log("Successfully category saved");
                    }
                    else{
                        throw "Failed to save category"
                    }
                }
            }
        })
    }
    catch(err){
        console.log(err);
    }
    res.send("inside categories");
});


//saving images

route.post("/images", function(req, res){
    var imgs = new imagesGallery({
        name: "animal",
        category: "Nature",
        likes: 1,
        imageLink: "google.com"
    })

    try{
        if(imgs.save())
            console.log("successfully saved image data");
        else throw "Failed to save image"
    }
    catch(err){
        console.log(err);
    }
    res.send("inside images")
});


//creating error and calling error handler

route.use((req, res, next)=>{
    const err = new Error("Route not found.");
    err.status = 404;
    next(err);
})

module.exports = route;