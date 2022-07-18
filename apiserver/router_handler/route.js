const {route,routes_role} = require('../MysqlConnection')
exports.navhandler = async (req,res) =>{
    const result = await route.create({
        navname:req.body.navname,
        name:req.body.name,
        component:req.body.component,
        path:req.body.path
    })
    res.cc('新增成功',0)
}

exports.navlisthandler = async (req,res) =>{

    const result = await route.findAll()
    res.cc(result,0)
}

exports.addnavhandler = async (req,res) =>{
  const result = await routes_role.create({
      roleid:req.body.roleid,
      routesid:req.body.routesid
  })
  res.cc(result,0)
}