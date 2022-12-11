const {Router} = require("express");
const route = Router();

route.get("/categories", function(req, res){
    res.send("inside categories");
});

route.get("/images", function(req, res){
    res.send("inside images");
});


//creating error and calling error handler

route.use((req, res, next)=>{
    const err = new Error("Route not found.");
    err.status = 404;
    next(err);
})

module.exports = route;