const dbServer = require("../dao/dbServe")

//添加好友
exports.applyFriend = (req,res)=>{
   let data = req.body;
   dbServer.applyFriend(data,res)
}

//更新好友状态
exports.updateFriendState = (req,res)=>{
   let data = req.body;
   dbServer.updateFriendState(data,res)
}

//删除好友
exports.deleteFriend = (req,res)=>{
   let data = req.body;
   dbServer.deleteFriend(data,res)
}