const joi =require('joi')

const rolename = joi.string().required()

const userid = joi.number()

// const roleid = joi.array().items(joi.string().required())
const roleid = joi.required()

const routesid = joi.number().required()



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
//根据用户id获取角色信息
exports.getrolechema = {
    params:{
        userid,
    }
}
