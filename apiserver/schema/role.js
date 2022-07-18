const joi =require('joi')

const rolename = joi.string().required()

const userid = joi.number()

// const roleid = joi.array().items(joi.string().required())
const roleid = joi.required()

exports.createroleschema ={
    body:{
        rolename,


    }
}
exports.assignrolesschema = {
    body:{
        roleid,
        userid
    }
}