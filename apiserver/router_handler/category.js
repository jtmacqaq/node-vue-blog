const {articles,articlecate} = require('../MysqlConnection')
exports.getcategory = async (req,res) =>{
    const results = await articles.findAll({
        where:{
            cate_id:req.params.id,
            state:'已发布'
        },
        include:{
            model:articlecate
        }
    })
    res.cc(results,0)
}