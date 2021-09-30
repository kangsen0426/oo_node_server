
const nodemailer = require("nodemailer");

//引入证书
const credentials = require("../config/credentials")


// 建立链接方式
let transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: credentials.qq.user,
    pass: credentials.qq.pass,
  },
});



//注册发送邮件给用户   
exports.emailSingUp = function (email, res) {
  //发送消息内容
  let option = {
    from: '2983973848@qq.com', // sender address
    to: email, // list of receivers
    subject: "感谢您在oo聊天注册", // Subject line
    text: "oo聊天注册成功！", // plain text body
    html: "<b>欢迎加入oo聊天！</b><a href='http://locahost:8080'>点击</a>", // html body
  }

  //发送邮件
  transporter.sendMail(option, (err, msg) => {
    if (err) {
      res.send(err)
      console.log(err)
    } else {
      console.log('邮箱发送成功！');
      res.send('邮箱发送成功！')
      console.log(msg);
    }
  })
}

