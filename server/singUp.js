const dbServer = require("../dao/dbServe")

//用户注册
exports.singUp = (req,res)=>{
    let {
        name,
        mail,
        pwd
    } = req.body


    console.log(req.body);

 

    dbServer.buildUser(name,mail,pwd,res);
}

//判断用户或邮箱是否被占用
exports.judgeValue = (req,res)=>{
    let {
        name,
        email
    } = req.body

    console.log(req.body)

    dbServer.countUserValue(name,email,res)
}