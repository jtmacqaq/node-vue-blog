//导入数据库操作模块

const db = require('../db/index')

const {role,route,user,user_role,routes_role} = require('../MysqlConnection')
//导入bcryptjs这个包，对密码加密

const bcrypt = require('bcryptjs')
//导入生成token的模块

const jwt = require('jsonwebtoken')
//导入配置文件
const config = require('../config')
const { expiresIn } = require('../config')
//注册新用户的处理函数
exports.reguser = (req,res) =>{

    //获取客户端提交的信息
    const userinfo = req.body
    //判断数据是否合法
    // if(!userinfo.username || !userinfo.password){
    //     return res.send({status:1,message:'用户名和密码不合法'})
    // }
    //定义sql语句，查询用户名是否被占用
    const sqlstr = 'select * from ev_users where username=?'

    //执行数据库查询语句

    db.query(sqlstr,userinfo.username,(err,results) =>{
        //判断sql查询是否失败
        if(err){
            // return res.send({status:1,message:err.message})
            return res.cc(err)
        }
        //查询出来的结果是一个数组，如果数组的长度大于0说明数据库已经有这个用户名了
        if(results.length >0){
            // return res.send({status:1,message:'用户名被占用，请更换其他用户名'})
            return res.cc('用户名被占用，请更换其他用户名',1)
        }

    })
    //调用bcrypt.hashSync()对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password,10)
    console.log(userinfo)
    //定义插入用户的sql语句
    const sql = 'insert into ev_users set ?'
    //调用db.query（）执行sql语句，插入新用户
    db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results) =>{

        //查询失败语句
        if(err){
            // return res.send({status:1,message:err.message})
            return res.cc(err)
        }
        //sql语句执行成功，但影响行数不为1
        if(results.affectedRows !== 1){
            // return res.send({status:1,message:'注册用户失败，请稍后再试'})
            return res.cc('注册用户失败，请稍后再试')
        }

        //注册成功
        const sql = 'select id from ev_users where username=?'
        db.query(sql,userinfo.username,async (err,results1) =>{
            if(err){
                return res.cc(err)
            }
            if(results1.length === 0){
                return res.cc('没找到相关数据')
            }
            console.log(results1[0].id)

            //创建用户的角色信息
            // const rolesql = await role.create({
            //     user_role_id:results1[0].id,
            //     rolename:'游客'
            // })


        })
        // res.send({status:0,message:'注册成功'})
        res.cc('注册成功',0)

    })
}

//登陆的处理函数

module.exports.login = (req,res) =>{
    //接收表单的数据
    const userinfo = req.body
    console.log(userinfo)
    //定义sql语句
    const sql = 'select * from ev_users where username=?'
    //执行sql语句，根据用户名查询用户的信息
    db.query(sql,userinfo.username,async (err,results) =>{
        //1.查询失败
        if(err){
            return res.cc(err)
        }
        //执行sql成功，但是获取到的数据条数不等于1
        if(results.length !== 1){
            return res.cc('登录失败')
        }
        //1.拿着用户输入的密码，和数据库存储的密码进行对比,得到的是一个布尔值
        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compareResult){
            //返回一个密码错误的信息
            return res.cc('密码错误')

        }
        const uid = results[0].id
        console.log(uid)
        //生成token
        const userxinxi = {...results[0],password:'',user_pic:''}
        //对用户的信息进行加密，生成token
        const tokenstr = jwt.sign(userxinxi,config.jwtSecretKey,{expiresIn:config.expiresIn})
        const roleinfo = await user_role.findAll({
            where:{
                userid:uid
            },
            raw:true,
            attributes:['roleid']
        })
        console.log(roleinfo)
        //处理roleinfo数组
        const rolestring = []
        roleinfo.map(item =>{
            rolestring.push(item.roleid)
        })
        //获取角色信息
        const rolelist = await role.findAll({
            where:{
                id:rolestring
            }
        })
        console.log(rolestring)
        const routeid = await routes_role.findAll({
            where:{
                roleid:rolestring
            },
            raw:true
        })
        console.log(routeid)
        const routestring = []
        routeid.map(item =>{
            routestring.push(item.routesid)
        })
        const routes = await route.findAll({
            where:{
                id:routestring
            }
        })
        console.log(routes)
        console.log(tokenstr)
        res.send({
            status:0,
            messages:'登录成功',
            token: 'Bearer ' + tokenstr,
            uid,
            routes,
            rolelist
        })

    })

    

}

