//导入mysql模块
const mysql = require('mysql')

//创建数据库连接对象

const db = mysql.createPool({
    host:'127.0.0.1', //数据库的ip地址
    user:'root',   //数据库的用户名
    password:'123456',  //数据库的密码
    database:'my_db-01', //要操作哪个数据表
})

//向外共享db数据库连接对象
module.exports = db