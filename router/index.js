const dbServe = require("../dao/dbServe")

module.exports = function(app){
    app.get("/test",(req,res) =>{
       dbServe.findUser(res)
    })
}