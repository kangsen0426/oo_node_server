const multer = require("multer")
const makdir = require("../dao/makdir")

//文件存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        let url = req.body.url
        makdir.mkdirs("../data/"+url,err=>{
            console.log(err);
        })

      cb(null, './data/'+url)
    },
    filename: function (req, file, cb) {
        let name = req.body.name
        let type = file.originalname.replace(/.+\./,".")
      cb(null,name+type)
    }
  })
  
const upload = multer({ storage: storage })
  
module.exports = (app)=>{
    //前端文件上传
    app.post('/files/upload',upload.array('photos',10),(req,res,next)=>{
        //获取文件信息
        let data = req.files[0].path

        //返回给前端
        res.send({
            data
        })
    })
}