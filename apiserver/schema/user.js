//导入验证模块
const joi = require('joi')

//用户名的验证规则

const username = joi.string().alphanum().min(1).max(10).required()

//定义密码的验证规则

const password = joi.string().required()

//定义ID，nickname,email的验证规则
const id = joi.number().integer().min(1).max(10).required()
const nickname = joi.string().required()
const email = joi.string().email().required()


//定义验证avatar头像的验证规则
//dataUri()指的是如下规则的字符串数据
//data:image/png
const avatar = joi.string().dataUri().required()

//定义验证注册和登录表单数据的规则对象

exports.reg_login_schema = {
    body:{
        username,
        password
    }
}
//验证规则对象 - 更新用户基本信息
exports.updateschema ={
    //需要对req.body里面的数据进行验证
    body:{

    id,
    nickname,
    email
    }
    

}

//重置密码
exports.updatepwdschema = {
    body:{
        //使用password这个规则，验证req.body.oldpwd的值
        oldpwd:password,
        // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newpwd:joi.not(joi.ref('oldpwd')).concat(password)
    }
}

//向外共享头像的验证规则对象
exports.updateavatar = {
    body:{
        avatar,
    }
}