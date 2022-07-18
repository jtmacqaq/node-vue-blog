const joi = require('joi')
const navname = joi.string().required()
const name = joi.string().required()
const component = joi.string().required()
const path = joi.string().required()
const roleid = joi.number().required()
const routesid = joi.array().items(joi.number().required())
exports.routeschema = {
    body:{
        navname,
        name,
        component,
        path
    }
}

exports.addroleroute ={
    body:{
        roleid,
        routesid
    }
}
