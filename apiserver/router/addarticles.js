const express = require('express')
//导入路由处理函数
const  addhandler = require('../router_handler/addarticles')
//导入解析formdata格式表单数据的包
const multer = require('multer')

//导入处理路径的核心模块

const path = require('path')
//导入验证规则函数
const {addarticleschema} = require('../schema/articles')

//导入验证组件中间件

const expressjoi = require('@escook/express-joi')

//创建路由对象

const router = express.Router()

//创建multer的实例对象，通过dest属性指定文件的存放路径

// const upload = multer({dest:path.join(__dirname,'../uploads')})
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        cb(null,Date.now() + file.originalname)
    }
})

const upload = multer({storage})
//upload.single是一个局部生效的中间件，用来解析formData格式的表单数据
//将文件类型的数据，解析并挂载到req.file属性中  
//将文本类型的数据，解析并挂载到req.body属性中
//发布文章路由
router.post('/add',upload.single('cover_img'),expressjoi(addarticleschema),addhandler.addarticleshandler)




//根据ID删除文章
router.get('/delete/:id',addhandler.deletearticle)

//根据ID获取文章信息
router.get('/articleinfo/:id',addhandler.getarticleinfo)

//根据ID更新文章信息
router.post('/updatearticle',addhandler.updatearticle)

//文章更新，封面上传api

router.post('/uploadimg',upload.single('uploadimg'),addhandler.uploadimg)
module.exports = router