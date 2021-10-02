const dbServer = require("../dao/dbServe")

//用户登入
exports.singIn = (req,res)=>{
    let {
        pwd
    } = req.body

    let data = {
        name:req.body.name,
        email:req.body.email
    }


    console.log(req.data);

    dbServer.userMatch(data,pwd,res)


}