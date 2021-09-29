var mongoose = require('mongoose');

//链接访问数据库需要配置权限 ?authSource=admin
mongoose.connect('mongodb://admin:5511@localhost:27017/oo?authSource=admin');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
  console.info("数据库链接成功");
});

module.exports = db;