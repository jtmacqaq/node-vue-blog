//导入express 模块

const express = require('express')
//引入editor
const ueditor = require('ueditor')

//创建express 实例

const app = express()

//导入跨域 cors中间件

const cors = require('cors')

//导入path模块

const path = require('path')
//导入验证模块

const joi = require('joi')

//导入并使用用户信息路由模块

const userinfo = require('./router/userinfo')
//将cors 注册为全局中间件

app.use(cors())

//配置解析application/x-www-form-urlencoded格式的表单数据中间件
app.use(express.urlencoded({extended:false}))


//托管静态资源

app.use(express.static(path.join(__dirname,'./uploads')));
//导入路由模块

const userrouter = require('./router/user')

// 导入并使用文章分类路由模块

const artcaterouter = require('./router/artcate')
//导入新增文章内容路由模块
const addarticles = require('./router/addarticles')

//一定要在路由之前，封装res.cc函数,全局中间件

app.use((req,res,next) =>{

    //status默认是1，代表失败的情况
    //err的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = function(err,status = 1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })

    }
    next()
})


//在路由之前配置解析token的中间件
//导入配置文件
const config = require('./config')
//解析token的中间件
const expressJWT = require('express-jwt')
//使用.unless({path:[/^\/api\//]})指定哪些接口不需要进行token的身份认证
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))


//注册路由为全局中间件

app.use('/api',userrouter)

//注册用户信息路由为全局路由模块
app.use('/my',userinfo)

//注册文章分类路由为全局路由模块
app.use('/my/article',artcaterouter)
//注册新增文章路由为全局路由模块
app.use('/my/addarticles',addarticles)



//定义错误级别的中间件

app.use((err,req,res,next) =>{
    //数据验证失败
    if(err instanceof joi.ValidationError) return res.cc(err)

    //捕获身份认证失败的错误

    if(err.name === 'UnauthorizedError'){
        return res.cc('身份认证失败')
    }
    //未知错误
    res.cc(err)
})

//启动服务器

app.listen(88)