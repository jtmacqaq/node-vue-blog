const express = require('express')
const router = express.Router()

const {createrole,assignroles,getrolelist} = require('../router_handler/role')
const {createroleschema,assignrolesschema} =require('../schema/role')
const expressjoi = require('@escook/express-joi')
//创建角色API
router.post('/',expressjoi(createroleschema),createrole)

//获取全部角色api
router.get('/getrole',getrolelist)

//用户分配角色api
router.post('/assignroles',expressjoi(assignrolesschema),assignroles)
module.exports =router