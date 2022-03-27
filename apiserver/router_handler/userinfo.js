//导入数据库操作模块
const db = require('../db/index')

// 在头部区域导入 bcryptjs 后，
// 即可使用 bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证密码是否正确
// compareSync() 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误

const bcrypt = require('bcryptjs')
exports.getuserinfo = (req,res) => {
    console.log(req.user)
    //定义sql语句
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
    //调用db.query()执行sql语句
    db.query(sql,req.user.id,(err,results) => {
        //1.执行sql语句失败
        if(err) return res.cc(err)
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if(results.length !== 1) return res.cc('获取用户信息失败')
        //3.将用户信息响应给客户端
        res.send({
            status:0,
            message:'获取用户信息成功',
            data: results[0],
        })
    })
}

//更新用户信息
exports.updateuserinfo = (req,res) =>{

    //定义待执行的sql语句
    const sql = 'update ev_users set ? where id=?'
    //调用db.query()执行sql语句并传递参数
    db.query(sql,[req.body,req.body.id],(err,results) =>{
        //执行sql语句失败
        if(err) return res.cc(err)
        //执行sql语句成功，但是影响行数不等于1
        if(results.affectedRows !== 1) return res.cc('更新失败')

        res.cc('更新信息成功',0)
    })
}

//修改密码

exports.updatepassword = (req,res) =>{
    //定义根据id查询用户数据的sql语句
    const sql = 'select * from ev_users where id=?'
    //执行sql查询用户是否存在
    db.query(sql,req.user.id,(err,results) =>{
        //执行sql语句失败
        if(err) return res.cc(err)
        //检查指定的id的用户是否存在
        if(results.length !==1){
            return res.cc('用户不存在')
        }
        //判断密码是否正确
        const compareresult = bcrypt.compareSync(req.body.oldpwd,results[0].password)
        if(!compareresult) return res.cc('原密码错误')
        //定义更新密码的sql语句
        const sql = 'update ev_users set password=? where id=?'
        //对新密码进行加密
        const newpwd = bcrypt.hashSync(req.body.newpwd,10)
        //调用db.query执行sql语句
        db.query(sql,[newpwd,req.user.id],(err,results) =>{
            //执行sql语句失败
            if(err) return res.cc(err)
            //判断影响的行数
            if(results.affectedRows !== 1) return res.cc('更新密码失败')
            res.cc('更新密码成功')
        })
    })
}

//更新头像
exports.updateavatar = (req,res) =>{
    //定义更新用户头像的sql语句
    const sql = 'update ev_users set user_pic=? where id=?'
    //调用db.query来执行sql语句
    db.query(sql,[req.body.avatar,req.user.id],(err,results) =>{
        //执行sql语句失败
        if(err) return res.cc(err)
        //执行sql语句成功，但是影响行数不等于1
        if(results.affectedRows !==1) return res.cc('更新头像失败')
        //更新用户头像成功
        res.cc('更新用户头像成功',0)
    })
}