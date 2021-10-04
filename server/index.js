const dbServer = require("../dao/dbServe")


//获取用户列表
exports.getUser = (req, res) => {
    let { uid, state } = req.body;

    dbServer.getUsers(uid, state, res)
}

//获取消息
exports.getOneMsg = (req, res) => {
    let { uid, fid } = req.body;

    dbServer.getOneMsg(uid, fid, res)
}

//未读消息数量
exports.unreadMsg = (req, res) => {
    let { uid, fid } = req.body;

    dbServer.unreadMsg(uid, fid, res)
}
