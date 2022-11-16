const express = require('express')
const router = express.Router()

const {createrole,assignroles,getrolelist,getuserlist,getroutrole,getroleid} = require('../router_handler/role')
const {createroleschema,assignrolesschema,routeroleschema,getrolechema} =require('../schema/role')
const expressjoi = require('@escook/express-joi')
//创建角色API
router.post('/',expressjoi(createroleschema),createrole)

//获取全部角色api
router.get('/getrole',getrolelist)

//用户分配角色api
router.post('/assignroles',expressjoi(assignrolesschema),assignroles)

//用户角色管理api
router.get('/userrolelist',getuserlist)
//根据用户id获取角色信息
router.get('/rolesid/:userid',expressjoi(getrolechema),getroleid)

module.exports =router