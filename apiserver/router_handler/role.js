const {role,user_role,user} = require('../MysqlConnection')
exports.createrole = async (req,res) =>{
    const result = await role.create({
        rolename:req.body.rolename
    })
    res.cc(result,0)
}

//分配角色处理函数

exports.assignroles = async (req,res)=>{
    const rolelist =req.body.roleid
    const result = await user_role.findAll({
        where:{
            userid:req.body.userid
        }
    })
    console.log(result.length)
    if(result.length !== 0){
        //已有角色，先删除原来的角色
        await user_role.destroy({
            where:{
                userid:req.body.userid
            }
        })
        //创建新的角色
        await user_role.create({
            userid:req.body.userid,
            roleid:req.body.roleid
        })
        res.cc('角色修改成功',3)
    }
    else{
   rolelist.map(item =>{
         user_role.create({
            userid:req.body.userid,
            roleid:item
        })
    })
    res.cc('分配成功',0)
    }
    // console.log(rolelist)
    // console.log(req.body.userid)
    // // console.log(rolelist.length)
 
  
}

//获取角色列表处理函数

exports.getrolelist = async (req,res)=>{
    const result = await role.findAll()
    res.cc(result,0)
}

//获取用户管理列表
exports.getuserlist = async (req,res) =>{
    try{
        const results = await user.findAll({
            attributes:['id','username','email','user_pic'],
            include:{
                model:role,
                  //隐藏中间关联表
                through:{attributes:[]}
            }
        })
        res.cc(results,0)
    }
    catch(err){
        res.cc(err,1)
    }

}

exports.getroleid = async (req,res) =>{
    console.log(req.params.userid)
    try{

        const result = await user_role.findAll({
            attributes:['id','roleid'],
            where:{
                userid:req.params.userid
            }
        })
        res.cc(result,0)
    }
    catch(err){
        res.cc(err,1)

    }
}
