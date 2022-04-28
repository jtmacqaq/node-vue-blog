// 导入express模块
const express = require('express')

//导入user路由的处理函数

const userhandler = require('../router_handler/user')

//导入路由处理函数
const  addhandler = require('../router_handler/addarticles')

//创建路由对象

const router = express.Router()

//1.导入验证数据的中间件

const expressjoi = require('@escook/express-joi')


//2.导入需要的验证规则对象

const {reg_login_schema } = require('../schema/user')

//注册新用户

router.post('/reguser',expressjoi(reg_login_schema),userhandler.reguser)

//登陆路由

router.post('/login',expressjoi(reg_login_schema),userhandler.login)

//获取文章列表路由
router.get('/list',addhandler.getarticlelb)



//根据ID获取文章信息
router.get('/articleinfo/:id',addhandler.getarticleinfo)


//根据用户ID获取用户和文章相关信息
router.get('/usertag/:id',addhandler.getusertag)
//将路由对象暴露出去

module.exports = router