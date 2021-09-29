const express = require('express')

const app = express()
const port = 3000


//跨域处理
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


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