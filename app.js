const express = require('express')
const bodyParser = require("body-parser")

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