//导入express
const express = require('express')
//创建路由对象
const router = express.Router()
//导入用户信息的处理函数模块
const userinfohandler = require('../router_handler/userinfo')

//导入解析formdata格式表单数据的包
const multer = require('multer')

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        cb(null,Date.now() + file.originalname)
    }
})

const upload = multer({storage})
//导入验证数据的中间件

const expressjoi = require('@escook/express-joi')

//导入需要验证规则的对象

const  { updateschema,updatepwdschema,updateavatar} = require('../schema/user')
//获取用户的基本信息

router.get('/userinfo',userinfohandler.getuserinfo)

//获取全部用户列表
router.get('/userinfolist',userinfohandler.getuserinfolist)

//更新用户的基本信息
router.post('/updateuserinfo',expressjoi(updateschema),userinfohandler.updateuserinfo)

//修改密码的路由

router.post('/updatepwd',expressjoi(updatepwdschema),userinfohandler.updatepassword)


//更换头像的路由
//upload.single是一个局部生效的中间件，用来解析formData格式的表单数据
//将文件类型的数据，解析并挂载到req.file属性中  
//将文本类型的数据，解析并挂载到req.body属性中

router.post('/update/avatar',upload.single('avatar'),userinfohandler.updateavatar)


//向外共享路由对象

module.exports = router