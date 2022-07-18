
const joi = require('joi')
const page_num = joi.number().integer().min(1).required()
const page_size = joi.number().integer().min(1).required()

exports.userinfolist = {
    body:{
        page_num,
        page_size
    }
}