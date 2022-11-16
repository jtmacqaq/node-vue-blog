const express = require('express')
const route = express.Router()
const {navhandler,navlisthandler,addnavhandler,getroutelist} = require('../router_handler/route')
const {routeschema,addroleroute,getrouteschema} = require('../schema/route')
const expressjoi = require('@escook/express-joi')

//新增菜单路由api
route.post('/',expressjoi(routeschema),navhandler)


//获取全部的菜单路由api

route.get('/getroute',navlisthandler)


//新建角色和路由的关系api
route.post('/addnav',expressjoi(addroleroute),addnavhandler)

//根据角色ID获取菜单路由
route.get('/getrouterlist/:roleid',expressjoi(getrouteschema),getroutelist)
module.exports = route