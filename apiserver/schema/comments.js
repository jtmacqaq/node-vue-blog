//导入定义验证规则的模块
const joi = require('joi')

const post_id = joi.number().integer().min(1).required()
const content = joi.string().required()
const from_uid = joi.number().integer().min(1).required()
const parent_id = joi.number().integer().min(1).required()
exports.commentsschema = {
    body:{
        post_id,
        content,
        from_uid
    }
}

exports.replycomments ={
    body:{
        post_id,
        content,
        from_uid,
        parent_id
    }
}