const express = require('express')

const router = express.Router()
//导入验证数据的中间件
const expressjoi = require('@escook/express-joi')
const likehandler = require('../router_handler/like')
const {likeschema,likenumschema}= require('../schema/like')


//点赞接口
router.post('/like',expressjoi(likeschema),likehandler.like)


module.exports = router