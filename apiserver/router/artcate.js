//导入express

const express = require('express')
//导入验证数据的中间件
const expressjoi = require('@escook/express-joi')

//导入文章分类的验证模块
const {addcateschema,deletecateshema,getcateschema,updatecateschema} = require('../schema/arcate')
//导入文章分类的路由处理函数
const artcatehandler = require('../router_handler/artcate')
//创建路由对象

const router = express.Router()

//获取文章分类的列表数据
router.get('/cates',artcatehandler.getarticlecates)

//新增文章分类的路由
router.post('/addcates',expressjoi(addcateschema),artcatehandler.addarticlecates)

//删除文章分类的路由
router.get('/deletecate/:id',expressjoi(deletecateshema),artcatehandler.deletecatebyid)

//根据id获取文章分类数据
router.get('/cates/:id',expressjoi(getcateschema),artcatehandler.getarticlebyid)

//根据id更新科目分类数据
router.post('/updatecate',expressjoi(updatecateschema),artcatehandler.updatecatebyid)
//向外共享路由对象
module.exports = router