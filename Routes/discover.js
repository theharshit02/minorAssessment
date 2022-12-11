const {Router} = require("express");
const route = Router();
const mongoose = require("mongoose");

const galleryCategory = mongoose.model("GalleryCategory")

route.get("/:categories", function(req, res){
    categories = req.params.categories;

    galleryCategory.find(function(err, cat){
        try{
            cat.forEach((list) => {
                if(categories === list.name){
                    res.send(list)
                }
                else{
                    console.log("Couldn't find the category");
                }
            })
        }
        catch(err){
            console.log(err);
        }
    })
})


module.exports = route;