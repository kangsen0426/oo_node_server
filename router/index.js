const dbServe = require("../dao/dbServe")
const emailServer = require("../dao/emailServer")
const singup = require("../server/singUp")
const singin = require("../server/singin")


module.exports = function (app) {
    // app.get("/test", (req, res) => {
    //     res.send("test")
    // })

    // //邮箱测试
    // app.post('/mail', (req, res) => {
    //     let mail = req.body.mail;
    //     // res.send(mail)
    //     console.log(mail);

    //     //发送邮件
    //     emailServer.emailSingUp(mail,res)
    // })

    //用户注册方法
    app.post("/singup/add",(req,res)=>{
        //注册用户
        singup.singUp(req,res);
    })

    //验证用户名或邮箱是否被占用的方法
    app.post("/singup/judge",(req,res)=>{
        //注册用户
        singup.judgeValue(req,res);
    })

     //登入
     app.post("/singin/match",(req,res)=>{
        //验证用户
        singin.singIn(req,res)
    })
}