const express = require('express')
const bodyParser = require("body-parser")
const jwt = require("./dao/jwt")
const app = express()
const port = 3000


//跨域处理
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', '3.2.1')
    if(req.method === 'OPTIONS') {
      res.send(200);
    } else {
      next();
    }
  });

//解析前端数据
app.use(bodyParser.json());

//验证token
app.use((req,res,next)=>{
  if(typeof(req.body.token) != 'undefined'){

    //验证token
    let token = req.body.token
    let tokenMatch = jwt.verifyToken(token)

    if(tokenMatch){
      //通过验证
      next()
    }else{
      //验证不通过
      res.send({
        status:300,
        msg:'token验证不通过'
      })
    }
  }else{
    next()
  }
})

require("./router/index")(app)
require("./router/index")(app)

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// 404 页面
app.use((req,res,next) =>{
    let err = new Error("Not Found")
    err.status = 404;
    next(err)
})

// 出错
app.use((err,req,res,next) =>{
    res.status(err.status || 500)
    res.send(err.message)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))