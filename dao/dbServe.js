const dbModel = require("../model/dbModel")
//引入加密文件
const bcrypt = require("../dao/bcrypt")

//引入token
const jwt = require("../dao/jwt")


const emailServer = require("../dao/emailServer")


const User = dbModel.model('User');
const Friend = dbModel.model('Friend');
const Message = dbModel.model("Message")


//新建用户
exports.buildUser = (name, mail, psw, res) => {
    //密码加密
    let password = bcrypt.encryption(psw)

    let data = {
        name,
        email: mail,
        psw: password,
        time: new Date()
    }

    let user = new User(data);

    user.save((err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: err
            })
        } else {
            //发送邮件
            emailServer.emailSingUp(mail, res)

            res.send({
                status: 200,
                msg: "注册成功！"
            })
        }
    })
}

//匹配用户是否存在
exports.countUserValue = (name, email, res) => {

    User.find({ name }, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                status: 500,
                msg: "错误！"
            })
        } else {

            // console.log(result);
            if (result.length) {
                console.log("用户名已存在！");
                //用户名在
                res.send({
                    status: 500,
                    msg: "用户名已存在"
                })


            } else {
                //查询邮箱是否存在
                User.find({ email }, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.send({
                            status: 500,
                            msg: "错误！"
                        })
                    } else {

                        // console.log(result);
                        if (result.length) {
                            console.log("邮箱已被注册！");
                            //用户名在
                            res.send({
                                status: 500,
                                msg: "邮箱已被注册"
                            })
                        } else {
                            res.send({
                                status: 200,
                                msg: '注册验证通过'
                            })
                        }
                    }
                })
            }
        }
    })







}

//用户验证
exports.userMatch = (data, pwd, res) => {
    let wherestr = { $or: [{ 'name': data.name }, { 'email': data.email }] }
    let out = { 'name': 1, 'imgurl': 1, 'psw': 1 }

    console.log(wherestr);
    console.log(data);

    User.find(wherestr, out, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: err
            })
        } else {
            console.log(result);

            if (result == '') {
                //未查到到匹配数据
                res.send({
                    status: 400,
                    msg: "未查到数据"
                })
            } else {

                console.log(result);

                result.map((e) => {
                    const pwdMatch = bcrypt.verfication(pwd, e.psw)

                    if (pwdMatch) {

                        let token = jwt.generateToken(e._id)

                        let back = {
                            id: e._id,
                            name: e.name,
                            imgurl: e.imgurl,
                            token
                        }

                        res.send({
                            status: 200,
                            msg: back
                        })

                    } else {
                        res.send({
                            status: 400,
                            msg: "登入失败"
                        })
                    }

                })



            }
        }
    })
}

//搜索用户
exports.searchUser = (data, res) => {
    let wherestr = { $or: [{ 'name': { $regex: data.name } }, { 'email': { $regex: data.email } }] }
    let out = { 'name': 1, 'imgurl': 1, 'email': 1 }


    console.log(data);


    User.find(wherestr, out, (err, result) => {

        console.log(result);


        if (err) {
            res.send({
                status: 500,
                msg: err
            })
        } else {
            res.send({
                status: 200,
                msg: result
            })
        }

    })


}

//判断是否为好友
exports.isFriend = (uid, fid, res) => {
    let wherestr = { 'userID': uid, 'friendID': fid, 'state': 0 }

    Friend.findOne(wherestr, (err, result) => {
        console.log(result);


        if (err) {
            res.send({
                status: 500,
                msg: err
            })
        } else {
            if (result) {
                //是好友
                res.send({
                    status: 200,
                    msg: '是好友'
                })
            } else {
                res.send({
                    status: 400,
                    msg: '不是好友'
                })
            }
        }


    })
}


//用户详情
exports.userDetail = (id, res) => {
    let wherestr = { '_id': id }
    let out = { 'psw': 0 };

    User.findOne(wherestr, out, (err, result) => {

        if (err) {
            res.send({
                status: 500,
                msg: err
            })
        } else {
            res.send({
                status: 200,
                msg: result
            })
        }

    })

}

//用户信息修改
exports.userUpdate = (data, res) => {
    let updatestr = {}

    //判断是否有密码
    if (typeof (data.pwd) != 'undefined') {
        //有密码
        User.find({ '_id': data.id }, { 'psw': 1 }, (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    msg: err
                })
            } else {
                if (result == '') {
                    res.send({
                        status: 400,
                        msg: '密码错误'
                    })
                } else {
                    result.map((e) => {
                        const pwdMatch = bcrypt.verfication(data.pwd, e.psw);

                        if (pwdMatch) {
                            //密码验证成功
                            //如果为修改密码先加密
                            if (data.type == 'psw') {
                                //密码加密
                                let password = bcrypt.encryption(psw)
                                updatestr[data.type] = password

                            } else {
                                updatestr[data.type] = data.data;

                            }

                            User.findByIdAndUpdate(data.id, updatestr, (err, resu) => {
                                if (err) {
                                    res.send({
                                        status: 500,
                                        msg: err
                                    })
                                } else {
                                    //修改成功
                                    res.send({
                                        status: 200,
                                        msg: result
                                    })
                                }
                            })
                        } else {
                            //密码匹配失败
                            res.send({
                                status: 400,
                                msg: "密码匹配失败"
                            })
                        }
                    })
                }
            }
        })
    } else {

        updatestr[data.type] = data.data;

        User.findByIdAndUpdate(data.id, updatestr, (err, resu) => {
            if (err) {
                res.send({
                    status: 500,
                    msg: err
                })
            } else {
                //修改成功
                res.send({
                    status: 200,
                    msg: resu
                })
            }
        })
    }
}

//修改好友昵称
exports.friendMarkNickName = (data, res) => {
    let wherestr = { 'userID': data.uid, 'friendID': data.fid };
    let updatestr = { 'nickname': data.name };

    Friend.updateOne(wherestr, updatestr, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: err
            })
        } else {
            //修改成功
            res.send({
                status: 200,
                msg: result
            })
        }
    })
}

//添加好友表
exports.buildFriend = (uid, fid, state, res) => {
    let data = {
        userID: uid,
        friendID: fid,
        state: state,
        time: new Date(),
        lastTime: new Date()
    }

    let friend = new Friend(data)

    friend.save((err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
}

//好友最后通讯时间
exports.upFriendLastTime = (data) => {
    let wherestr = {
        $or: [
            {
                'userID': data.uid,
                'friendID': data.fid
            },
            {
                'userID': data.fid,
                'friendID': data.uid
            },
        ]
    }

    let updatestr = {
        'lastTime': new Date()
    }

    Friend.updateMany(wherestr, updatestr, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
}

//添加一对一消息
exports.insertMessage = (uid, fid, msg, type, res) => {
    let data = {
        userID: uid,
        friendID: fid,
        message: msg,
        time: new Date(),
        state: 0,
        type: type
    }

    let message = new Message(data);

    message.save((err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: err
            })
        } else {
            res.send({
                status: 200,
                msg: result
            })
        }
    })
}

//好友申请
exports.applyFriend = (data, res) => {
    //判断是否已经申请过
    let wherestr = {
        'userID': data.uid,
        'friendID': data.fid,
    }
    Friend.countDocuments(wherestr, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: err
            })
        } else {
            //如果result为 0 则是第一次申请
            if (result === 0) {
                this.buildFriend(data.uid, data.fid, 2)
                this.buildFriend(data.fid, data.uid, 1)
            } else {
                //已经申请了好友
                this.upFriendLastTime(data)

            }

            //添加申请消息
            this.insertMessage(data.uid, data.fid, data.msg, 0, res)
        }
    })
}

//更新好友状态
exports.updateFriendState = (data, res) => {
    let wherestr = {
        $or: [
            {
                'userID': data.uid,
                'friendID': data.fid
            },
            {
                'userID': data.fid,
                'friendID': data.uid
            },
        ]
    }

    Friend.updateMany(wherestr, { 'state': 0 }, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: err
            })
        } else {
            res.send({
                status: 200,
                msg: result
            })
        }
    })
}


//拒绝或/删除好友
exports.deleteFriend = (data, res) => {
    let wherestr = {
        $or: [
            {
                'userID': data.uid,
                'friendID': data.fid
            },
            {
                'userID': data.fid,
                'friendID': data.uid
            },
        ]
    }

    Friend.deleteMany(wherestr, { 'state': 0 }, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: err
            })
        } else {
            res.send({
                status: 200,
                msg: result
            })
        }
    })
}

//按要求获取用户列表
exports.getUsers = (uid, state, res) => {
    let query = Friend.find({});

    //条件查询
    query.where({
        'userID': uid,
        'state': state
    })

    //查找friendID 关联的user对象
    query.populate('friendID');
    //排序方式 
    query.sort({
        'lastTime': -1
    })
    //查询结果
    query.exec().then((e) => {
        let result = e.map((ver) => {
            return {
                id: ver.friendID._id,
                name: ver.friendID.name,
                nickName: ver.nickName,
                imgurl: ver.friendID.imgurl,
                lastTime: ver.lastTime
            }
        })

        res.send({
            status: 200,
            msg: result
        })
    }).catch((err) => {
        res.send({
            status: 500,
            msg: err
        })
    })
}

//获取一对一消息
exports.getOneMsg = (uid, fid, res) => {
    let query = Message.findOne({});

    //条件查询
    query.where({
        $or: [
            {
                'userID': uid,
                'friendID': fid
            },
            {
                'userID': fid,
                'friendID': uid
            },
        ]
    })

    //排序方式 
    query.sort({
        'time': -1
    })
    //查询结果
    query.exec().then((e) => {

        let result = {
            message: e.message,
            time: e.time,
            type: e.type
        }

        res.send({
            status: 200,
            msg: result
        })
    }).catch((err) => {
        res.send({
            status: 500,
            msg: err
        })
    })
}

//好友未读消息数量
exports.unreadMsg = (uid, fid, res) => {
    let wherestr = {
        'userID': uid,
        'friendID': fid,
        'state':0
    }


    Message.countDocuments(wherestr, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: err
            })
        } else {
            res.send({
                status: 200,
                msg: result
            })
        }
    })
}