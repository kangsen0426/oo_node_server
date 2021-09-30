const bcrypt = require("bcryptjs")

//生成 hash 密码
exports.encryption = function(e){

    //生成随机的 salt
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(e, salt);

    return hash
}

//解密
exports.verfication = function(e,hash){
    let verif = bcrypt.compareSync(e, hash); 

    return verif
}