const {Router} = require("express");
const route = Router();

route.get("/categories", function(req, res){
    res.send("inside categories");
});

module.exports = route;