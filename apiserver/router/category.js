const express = require('express')
const router = express.Router()

const category = require('../router_handler/category')

//获取分类下的文章
router.get('/cate/:id',category.getcategory)

//对外暴露路由
module.exports = router