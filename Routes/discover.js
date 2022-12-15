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


//get 4 images and filters based on created date (asc and desc) and likes and shuffle

route.get("/getimages/:category", async function(req, res){
    category = req.params.category
    sortDate = req.query.sortDate
    likes = parseInt(req.query.likes)
    shuffle = parseInt(req.query.shuffle)


    if(likes === 1){
        filter = {likes: 1}
    }
    else{
        filter = {}
    }


    let data = []
    if(sortDate === "asc"){
        x = await imagesGallery.find({category: {$in: [category]}, filter}).sort({createdAt: 1})
        x.forEach((list)=>{
            data.push(list.name)
        })
    }
    else if(sortDate === "desc"){
        x = await imagesGallery.find({category: {$in: [category]}, filter}).sort({createdAt: -1})
        x.forEach((list)=>{
            data.push(list.name)
        })
    }
    

    let shuffleData = []
    if(shuffle === 1){
        for (i=0; i<data.length; i++){
            x = Math.floor(Math.random()*data.length)
            shuffleData[i] = data[x];        
        }
        res.send(shuffleData.slice(0,4))
    }
    else if(shuffle === 0){
        res.send(data.slice(0,4))
    }
})


//mark an image favourite

route.get("/favourite/:id", async function(req, res){
    id = req.params.id
    if(id !== ""){
        imagesGallery.findById(id, async function(err, result){
            if(err){
                console.log(err);
            }
            else{
                console.log("before update: ",result);
                likeCount = result.likes
                likeCount += 1
                await imagesGallery.findByIdAndUpdate(id, {likes : likeCount})
                x = await imagesGallery.findById(id)
                console.log("after update", x);
            }
        })
    }
})

 

route.use((req, res, next)=>{
    const err = new Error("Route not found.");
    err.status = 404;
    next(err);
})

module.exports = route;