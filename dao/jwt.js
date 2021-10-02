//引入token
const jwt = require("jsonwebtoken")

const secret = "kangsen"

//生成token
exports.generateToken = (id)=>{
    let paylod = {id,time:new Date()};
    let token = jwt.sign(paylod,secret,{expiresIn:60 *60 *24 *120})

    return token;
}

//解码token
exports.verifyToken = (token)=>{
    let payload = jwt.verify(token,secret)

    return payload;
}