const express = require('express')
const route = express.Router()
const {navhandler,navlisthandler,addnavhandler} = require('../router_handler/route')
const {routeschema,addroleroute} = require('../schema/route')
const expressjoi = require('@escook/express-joi')

//新增菜单路由api
route.post('/',expressjoi(routeschema),navhandler)


//获取全部的菜单路由api

route.get('/getroute',navlisthandler)


//新建角色和路由的关系api
route.post('/addnav',expressjoi(addroleroute),addnavhandler)
module.exports = route