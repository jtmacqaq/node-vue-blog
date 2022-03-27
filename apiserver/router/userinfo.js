//导入express
const express = require('express')
//创建路由对象
const router = express.Router()
//导入用户信息的处理函数模块
const userinfohandler = require('../router_handler/userinfo')

//导入验证数据的中间件

const expressjoi = require('@escook/express-joi')

//导入需要验证规则的对象

const  { updateschema,updatepwdschema,updateavatar} = require('../schema/user')

//获取用户的基本信息

router.get('/userinfo',userinfohandler.getuserinfo)

//更新用户的基本信息
router.post('/userinfo',expressjoi(updateschema),userinfohandler.updateuserinfo)

//修改密码的路由

router.post('/updatepwd',expressjoi(updatepwdschema),userinfohandler.updatepassword)


//更换头像的路由

router.post('/update/avatar',expressjoi(updateavatar),userinfohandler.updateavatar)
//向外共享路由对象

module.exports = router