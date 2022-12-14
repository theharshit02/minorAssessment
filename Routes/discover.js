const {Router} = require("express");
const route = Router();
const mongoose = require("mongoose");

const galleryCategory = mongoose.model("GalleryCategory");
const imagesGallery = mongoose.model("ImagesGallery");


//list categories

route.get("/listCategories", function(req, res){
    list = []
    galleryCategory.find(function(err, cat){
        if(err){
            throw err
        }
        else{
            cat.forEach((i)=>{
                list.push(i.name);
            })
            res.send(list)
        }
    })
})


//get 4 images based on category

route.get("/getImages/:category", function(req, res){
    category = req.params.category
    images =[]
    imagesGallery.find(function(err, result){
        result.forEach((i)=>{
            x = i.category
            x.forEach((cat)=>{
                if(cat === req.params.category){
                    images.push(i.name)   
                }
            })
        })
        res.send(images.slice(0,4))
    })

    
})

route.use((req, res, next)=>{
    const err = new Error("Route not found.");
    err.status = 404;
    next(err);
})

module.exports = route;