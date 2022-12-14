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


//filters based on created date (asc and desc) and likes

route.get("/filter", async function(req, res){
    sortDate = req.query.sortDate
    likes = parseInt(req.query.likes)

    if(likes === 1){
        filter = {likes: 1}
    }
    else{
        filter = {}
    }

    let data = []
    if(sortDate === "asc"){
        x = await imagesGallery.find(filter).sort({createdAt: 1})
        x.forEach((list)=>{
            data.push(list.name)
        })
    }
    else if(sortDate === "desc"){
        x = await imagesGallery.find({likes: liked}).sort({createdAt: -1})
        x.forEach((list)=>{
            data.push(list.name)
        })
    }

    res.send(data)
    
})

route.use((req, res, next)=>{
    const err = new Error("Route not found.");
    err.status = 404;
    next(err);
})

module.exports = route;