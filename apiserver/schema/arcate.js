//导入定义验证规则的模块
const joi = require('joi')

//定义分类名称和分类类名的校验规则

const name = joi.string().required()
const alias = joi.string().alphanum().required()

//定义分类id的校验规则

const id = joi.number().integer().min(1).required()

exports.addcateschema = {
    body:{
        name,
        alias,
    }
}

//校验规则对象- 删除分类
exports.deletecateshema = {
    params:{
        id,
    }
}
//根据id获取文章分类信息
exports.getcateschema = {
    params:{
        id,
    }
}
//根据id更新文章分类信息
exports.updatecateschema = {
    body:{
        id,
        name,
        alias
    }
}