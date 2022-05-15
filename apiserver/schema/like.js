const joi = require('joi')
const post_id = joi.number().integer().min(1).required()
const from_uid = joi.number().integer().min(1).required()

exports.likeschema = {
    body:{
        post_id,
        from_uid
    }
}
exports.likenumschema = {
    body:{
        post_id
    }
}