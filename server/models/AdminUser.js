const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: { type: String },
    password: { type: String,
        select:false,//设置密码查不出来
        set(val){
        // bcrypt需要下载; 是把密码转成不可逆转的随机乱码
        //hashSync 散列,是个同步方法
        return require("bcrypt").hashSync(val,10)
    } }


})
module.exports = mongoose.model("AdminUser", schema)