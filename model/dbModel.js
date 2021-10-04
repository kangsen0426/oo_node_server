var mongoose = require('mongoose');

const db = require("../config/db")

const Schema = mongoose.Schema

let UserSchema = new Schema({
    name:{type:String},             //用户名
    psw:{type:String},              //密码
    email:{type:String},             //邮箱
    sex:{type:String,default:'asexual'}, //性别，默认为中性
    birth:{type:String},              //生日
    phone:{type:Number},                //电话
    explain:{type:String,default:`什么也没有~`},                   //介绍
    imgurl:{type:String,default:`https://picsum.photos/seed/${new Date()}/400/600`}, //用户头像
    time:{type:Date},               //注册日期
})

//好友关系表
let FriendSchema = new Schema({
    userID:{type:Schema.Types.ObjectId,ref:"User"},             //用户id
    friendID:{type:Schema.Types.ObjectId,ref:"User"},             //好友id
    state:{type:Number},               // 好友状态 0 以为好友   1 正在申请  2 不是好友
    nickname:{type:String},         //昵称
    time:{type:Date},               //生成时间
    lastTime:{type:Date}        //最后一条消息时间

})

//一对一消息表
let MessageSchema = new Schema({
    userID:{type:Schema.Types.ObjectId,ref:"User"},             //用户id
    friendID:{type:Schema.Types.ObjectId,ref:"User"},             //好友id
    message:{type:String},                          //内容
    type:{type:Number},         //消息类型  0 文字  1 图片  2 视频 3 音频 4 位置
    state:{type:Number},                            // 消息状态 0 未读   1 已经读
    time:{type:Date},               //发送时间

})

//群表
let GroupSchema = new Schema({
    userID:{type:Schema.Types.ObjectId,ref:"User"},             //用户id
    name:{type:String},                                      //群名称
    imgurl:{type:String,default:'group.png'},               //用户头像
    type:{type:Number},                                 //消息类型  0 文字  1 图片  2 视频 3 音频 4 位置
    notice:{type:String},                            // 公告
    time:{type:Date},                               //创建时间

})

//群成员表
let GroupUserSchema = new Schema({
    userID:{type:Schema.Types.ObjectId,ref:"User"},             //用户id
    groupID:{type:Schema.Types.ObjectId,ref:"Group"},             //群id
    name:{type:String},             //群内名称
    tip:{type:Number,default:0}, //未读消息
    time:{type:Date},               //加入时间
    shield:{type:Number}        //是否屏蔽消息 0 不屏蔽   1 屏蔽
})

//群成员表
let GroupMsgSchema = new Schema({
    userID:{type:Schema.Types.ObjectId,ref:"User"},             //发送者id
    groupID:{type:Schema.Types.ObjectId,ref:"Group"},             //群id
    message:{type:String},                          //内容
    type:{type:Number},         //消息类型  0 文字  1 图片  2 视频 3 音频 4 位置
    time:{type:Date},               //发送时间
})





module.exports = db.model('User',UserSchema);
module.exports = db.model('Friend',FriendSchema);
module.exports = db.model('Message',MessageSchema);
module.exports = db.model('Group',GroupMsgSchema);
module.exports = db.model('GroupUser',GroupUserSchema);
module.exports = db.model('GroupMsg',GroupMsgSchema);