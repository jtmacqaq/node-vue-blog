//导入处理路径的path核心模块
const path = require('path')
const db = require('../db/index')
//导入文章models
const articles = require('../models/articles')

//发布文章路由处理函数
exports.addarticleshandler = async (req,res) =>{
    console.log(req.file.filename)
    console.log(req.file)
    // console.log(req.file.fieldname)
    var formatDateTime = function (date) {  
        var date= new Date(Date.parse(date));
                    var y = date.getFullYear();  
                    var m = date.getMonth() + 1;  
                    m = m < 10 ? ('0' + m) : m;  
                    var d = date.getDate();  
                    d = d < 10 ? ('0' + d) : d;  
                    var h = date.getHours();  
                    h=h < 10 ? ('0' + h) : h;  
                    var minute = date.getMinutes();  
                    minute = minute < 10 ? ('0' + minute) : minute;  
                    var second=date.getSeconds();  
                    second=second < 10 ? ('0' + second) : second;  
                    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
                };  
    
    //手动判断是否上传了文章封面
    if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数')
    // const articlesinfo = {
    //     //标题 内容 状态  所以分类的ID
    //     ...req.body,
    //     //文章封面在服务器端的存放路径
    //     cover_img:path.join('/uploads',req.file.fieldname),
    //     //文章分别时间
    //     pub_date:new Date(),
    //     //文章的作者id
    //     author_id:req.user.id
    // }
    const results = await articles.create({
        title:req.body.title,
        content:req.body.content,
        cover_img:`http://localhost:88/${req.file.filename}`,
        // cover_img:path.join('/uploads',req.file.fieldname),
        //文章分别时间
        pub_date:formatDateTime(Date()),
        //文章的作者id
        author_id:req.user.id,
        cate_id:req.body.cate_id,
        state:req.body.state

    })
    const img_url = `http://localhost:88/${req.file.filename}`
    // const sql = 'insert into ev_article set ?'
    // db.query(sql,articlesinfo,(err,results) =>{
    //     if(err) return res.cc(err)
    //     if(results.affectedRows !== 1) return res.cc('文章发布失败')
    //     res.cc('发布文章成功',0)
    // })
    console.log(results)
    res.cc({data:req.file,img_url},0)

}

//获取文章列表处理函数

exports.getarticlelb = async (req,res) =>{
    const page_num = parseInt(req.query.page_num) //页码
    const page_size = parseInt(req.query.page_size)  //每页显示的数量

    const results = await articles.findAndCountAll({
        offset: (page_num - 1) * page_size,
        limit: page_size
    })
    res.cc({data:results,page_num,page_size,total:results.count},0)
  



}

//根据ID删除文章

exports.deletearticle = async (req,res) =>{
    const id = req.params.id
    console.log(id)
    const results = await articles.destroy({
        where:{
            id
        }
    })
    console.log(results)
    if(results === 0){
        res.cc('删除失败')
    }
    res.cc('删除文章成功',0)
}

//根据ID获取文章信息

exports.getarticleinfo = async (req,res) =>{
    const id = req.params.id
    const results = await articles.findAll({
        where:{
            id
        }
    })
    res.cc({data:results},0)
}

//根据ID更新文章信息
exports.updatearticle = async (req,res) =>{
    console.log(req.body.id)
    console.log(req.file)
    const results = await articles.update({
        title:req.body.title,
        content:req.body.content,
        cate_id:req.body.cate_id,
        state:req.body.state
    },{
        where:{
            id:req.body.id
        }
    })
    console.log(results)
    res.cc('修改成功',0)

}


//根据id更新文章图片上传路由函数

exports.uploadimg = async (req,res) =>{
    const results = await articles.update({
        cover_img:req.file.filename
    },{
        where:{
            id:req.body.id
        }
    })
    console.log(results)
    res.cc('更新封面成功',0)
}
