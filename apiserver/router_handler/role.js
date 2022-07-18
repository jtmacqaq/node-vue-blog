const {role,user_role} = require('../MysqlConnection')
exports.createrole = async (req,res) =>{
    const result = await role.create({
        rolename:req.body.rolename
    })
    res.cc(result,0)
}

//分配角色处理函数

exports.assignroles = async (req,res)=>{
    const rolelist =req.body.roleid
    console.log(rolelist)
    console.log(req.body.userid)
    // console.log(rolelist.length)
    rolelist.map(item =>{
         user_role.create({
            userid:req.body.userid,
            roleid:item
        })
    })
  
}

//获取角色列表处理函数

exports.getrolelist = async (req,res)=>{
    const result = await role.findAll()
    res.cc(result,0)
}