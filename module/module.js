var mongoose = require('mongoose');

/** 创建Schema、创建Model **/
// var Revision = new mongoose.Schema({
//     title: String,
//     timestamp: String,
//     user: String,
//     //年份
//     year:String,
//     //分类
//     editCla:String,
// });
// mongoose.model('Revision', Revision)

//用户
var User = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    type: int,   //只能是1（end user），2(technical team)
});
mongoose.model('User', User)


module.exports = mongoose;