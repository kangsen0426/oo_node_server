const dbServer = require("../dao/dbServe")

//用户搜索
exports.searchUser = (req,res)=>{
    let data = {
        name:req.body.name,
        email:req.body.email
    }
    dbServer.searchUser(data,res);
}

//判断是否为好友
exports.isFriend = (req,res)=>{
    let uid = req.body.uid;
    let fid = req.body.fid;

    dbServer.isFriend(uid,fid,res)
}