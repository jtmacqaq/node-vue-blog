const joi = require('joi')
const navname = joi.string().required()
const name = joi.string().required()
const component = joi.string().required()
const path = joi.string().required()
const roleid = joi.number().required()
const routesid = joi.array().required()
const icon = joi.string().required()
const redirect = joi.string().allow('')
const parentid = joi.number()
exports.routeschema = {
    body:{
        navname,
        name,
        component,
        path,
        icon,
        redirect,
        parentid
    }
}

exports.addroleroute ={
    body:{
        roleid,
        routesid
    }
}
exports.getrouteschema = {
    params:{
        roleid
    }
}