const dbServer = require("../dao/dbServe")
const emailServer = require("../dao/emailServer")


//用户注册
exports.singUp = (req,res)=>{
    let {
        name,
        mail,
        pwd
    } = req.body


    // console.log(req.body);

 
    

    dbServer.buildUser(name,mail,pwd,res);

    //发送邮件
    emailServer.emailSingUp(mail,res)

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