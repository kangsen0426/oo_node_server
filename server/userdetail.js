const dbServer = require("../dao/dbServe")

//用户详情
exports.userDetail = (req,res)=>{
    let id = req.body.uid;

    console.log(req.body);
    dbServer.userDetail(id,res)
    
}


//用户信息修改
exports.userUpdate = (req,res)=>{
    let data = req.body;
    dbServer.userUpdate(data,res)
    
}

//修改好友昵称
exports.friendMarkNickName = (req,res)=>{
    let data = req.body
    dbServer.friendMarkNickName(data,res)
}