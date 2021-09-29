const dbModel = require("../model/dbModel")
const User = dbModel.model('User');

exports.findUser = (res)=>{
    User.find((err,val)=>{
        if(err){
            console.log(err);
        }else{
            res.send(val)
        }
    })
}

