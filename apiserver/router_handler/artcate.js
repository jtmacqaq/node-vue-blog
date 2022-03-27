//导入数据库操作模块

const db = require('../db/index')
const user = require('../models/user')
const { Op } = require('sequelize')
exports.getarticlecates = async (req, res) => {
    console.log(req.query)

    const title = req.query.title
    //当前页面
    const page_num = parseInt(req.query.page_num);
    //每页显示数量
    const page_size = parseInt(req.query.page_size)
    //    const params =[(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
    if (!title) {
        const results = await user.findAndCountAll({
            offset: (page_num - 1) * page_size,
            limit: page_size
        })
        res.cc({
            data: results,
            page_num,//页码
            page_size,//每页数量
            total: results.count //总数
        }, 0)
    }
    else {

        const results = await user.findAndCountAll({
            where: {
                //1.精确查询
                // name: tite

                //2.模糊查询
                name:{
                    [Op.like]:`%${title}%`
                }
                
            },
            offset: (page_num - 1) * page_size,
            limit: page_size,

        })
        res.cc({
            data: results,
            page_num,//页码
            page_size,//每页数量
            total: results.count //总数
        }, 0)
    }

    //    if(!title){
    //    //定义sql语句，根据分类的状态，获取所有未被删除的分类列表的数据
    //    const sql = 'select * from ev_article_cate limit ?,?'
    //               //调用db.query()执行sql语句
    // db.query(sql,params,(err,results) =>{
    //     if(err) return res.cc(err)
    //     //执行查询成功
    //     let sql = 'select count(*) as total from ev_article_cate'
    //     db.query(sql,(err,row) =>{
    //         if(err) return res.cc(err)
    //         let total = row[0]['total']
    //         res.cc({
    //             status:0,
    //             message:'获取文章分类成功',
    //             data:results,
    //             paging:{
    //                 page_num:page_num,
    //                 page_size:page_size,
    //                 total:total

    //             }
    //         },0)

    //     })

    // })
    //    }else{
    //     let sql ='select * from ev_article_cate where name=? limit ?,?'
    //     const params =[title,(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
    //     db.query(sql,params,(err,results) =>{
    //         if(err) return res.cc(err)
    //         //执行查询成功
    //         let sql = 'select count(*) as total from ev_article_cate where name=?'
    //         db.query(sql,title,(err,row) =>{
    //             if(err) return res.cc(err)
    //             let total = row[0]['total']
    //             res.cc({
    //                 status:0,
    //                 message:'获取文章分类成功',
    //                 data:results,
    //                 paging:{
    //                     page_num:page_num,
    //                     page_size:page_size,
    //                     total:total

    //                 }
    //             },0)

    //         })

    //     })


    //    }







}

//新增文章分类的处理函数
exports.addarticlecates = (req, res) => {
    //1.定义查重的sql语句
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    //2.执行查重sql语句
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        //3.判断是否查询sql失败
        if (err) return res.cc(err)
        //4.1判断数据的length
        if (results.length === 2) {
            res.cc('分类名称与分类别名被占用')
        }
        //4.2length等于1的三种情况
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            res.cc('分类名称与分类别名被占用')
        }
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用')
        //定义插入文章分类的sql语句
        const sql = 'insert into ev_article_cate set ?'
        //执行插入文章分类的sql语句
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
            res.cc('新增分类成功', 0)
        })
    })
}

//删除文章分类的处理函数
exports.deletecatebyid = async (req, res) => {
    //定义删除分类的sql语句
    const results = await user.destroy({
        where:{
            id:req.params.id
        }
    })
    if(results === 0) return res.cc('删除文章分类失败')
    res.cc('删除文章分类成功',0)

}
//根据id获取文章分类信息处理函数
exports.getarticlebyid = async (req, res) => {
    const id = req.params.id
    const results = await user.findAll({
        where: {
            id: id
        }
    })
    console.log(results.length)
    if (results.length !== 1) {
        res.cc('获取文章分类数据失败')
    }
    res.cc({
        data: results
    }, 0)
}

//根据id更新文章分类信息处理函数
exports.updatecatebyid = async (req, res) => {
    //通过查询name和alias查重
    const results = await user.findAll({
        where: {
            id: req.body.id,
            [Op.or]: [
                { name: req.body.name },
                { alias: req.body.alias }
            ]
        }
    })
    console.log(req.body)
    console.log(results)
    if (results.length === 2) return res.cc('分类名称和别名被占用，请更换后重试')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称和别名被占用，请更换后重试')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试')
    //更新文章分类
    const results1 = await user.update({
        name:req.body.name,
        alias:req.body.alias
    },{
        where:{
            id:req.body.id
        }
    })
    res.cc('更新文章分类成功',0)
}
