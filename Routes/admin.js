const {Router} = require("express");
const route = Router();

route.get("/categories", function(req, res){
    res.send("inside categories");
});

route.get("/images", function(req, res){
    res.send("inside images");
});

module.exports = route;