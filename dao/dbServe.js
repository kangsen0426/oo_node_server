const dbModel = require("../model/dbModel")
//引入加密文件
const bcrypt = require("../dao/bcrypt")

//引入token
const jwt = require("../dao/jwt")


const User = dbModel.model('User');


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

