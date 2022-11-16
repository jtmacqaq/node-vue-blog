const {route,routes_role} = require('../MysqlConnection')
exports.navhandler = async (req,res) =>{
    const result = await route.create({
        navname:req.body.navname,
        name:req.body.name,
        component:req.body.component,
        path:req.body.path,
        icon:req.body.icon,
        redirect:req.body.redirect,
        parentid:req.body.parentid

    })
    res.cc('新增成功',0)
}

exports.navlisthandler = async (req,res) =>{

    const result = await route.findAll()
    res.cc(result,0)
}

exports.addnavhandler = async (req,res) =>{
  try{
    const result1 = await routes_role.findAll({
      where:{
        roleid:req.body.roleid
      }
    })
    if(result1.length !== 0){
      //有记录，要删除
      await routes_role.destroy({
        where:{
          roleid:req.body.roleid
        }
      })
      //再新建
      const routeslist = req.body.routesid
      console.log(routeslist)
      const result = await routeslist.forEach( item => {
          routes_role.create({
            roleid:req.body.roleid,
            routesid:item
        })
      })
      res.cc(result,0)

    }
    else{
      const routeslist = req.body.routesid
      console.log(routeslist)
      const result = await routeslist.forEach( item => {
          routes_role.create({
            roleid:req.body.roleid,
            routesid:item
        })
      })
      res.cc(result,0)
    }

  }
  catch(err){
      console.log(err)

  }

  
}

exports.getroutelist = async (req,res) =>{
    const results = await routes_role.findAll({
      where:{
        roleid:req.params.roleid
      }
    })
    res.cc(results)
}