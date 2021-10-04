
const singup = require("../server/singUp")
const singin = require("../server/singin")
const search = require("../server/search")
const userdetail = require("../server/userdetail")
const friend = require("../server/friend")


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
    app.post("/singup/add", (req, res) => {
        //注册用户
        singup.singUp(req, res);
    })

    //验证用户名或邮箱是否被占用的方法
    app.post("/singup/judge", (req, res) => {
        //注册用户
        singup.judgeValue(req, res);
    })

    //登入
    app.post("/singin/match", (req, res) => {
        //验证用户
        singin.singIn(req, res)
    })

    //搜索用户
    app.post("/search/user", (req, res) => {
        //验证用户
        search.searchUser(req, res);
    })

    //验证是否为好友
    app.post("/search/isfriend", (req, res) => {
        //验证用户
        search.isFriend(req, res);
    })

    //用户详情
    app.post("/user/detail", (req, res) => {
        console.log("okoik");
        userdetail.userDetail(req, res);
    })

    //用户信息修改
    app.post("/user/update", (req, res) => {
        
        userdetail.userUpdate(req, res);
    })

    //好友昵称修改
    app.post("/user/markname", (req, res) => {
       
        userdetail.friendMarkNickName(req, res);
    })

    //好友申请
    app.post("/user/friendapply", (req, res) => {
       
        friend.applyFriend(res,req);
    })

     //好友状态修改
     app.post("/user/updateFriendState", (req, res) => {
       
        friend.updateFriendState(res,req);
    })

     //拒绝/删除好友
     app.post("/user/deleteFriend", (req, res) => {
       
        friend.deleteFriend(res,req);
    })

}