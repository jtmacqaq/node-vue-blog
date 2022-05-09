const express = require('express')
//创建路由对象
const router = express.Router()
//导入验证数据的中间件
const expressjoi = require('@escook/express-joi')
const {commentsschema,replycomments} = require('../schema/comments')
//导入评论路由的处理函数
const commentshandler = require('../router_handler/comments')
//创建评论的路由api

router.post('/comments',expressjoi(commentsschema),commentshandler.postcomments)

//创建回复评论的路由api
router.post('/replycomments',expressjoi(replycomments),commentshandler.replycomments)

//根据文章的ID获取回复的API

router.get('/getreplycomments',commentshandler.getreplycomments)

//导入路由

module.exports = router