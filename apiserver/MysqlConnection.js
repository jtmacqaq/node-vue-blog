const Sequelize = require('sequelize')
const tagmodel = require('./models/tag')
const articletagmodel = require('./models/article_tag')
const usermodel = require('./models/user')
const articlemodel = require('./models/articles')
const articlecatemodel = require('./models/articlecate')
//创建sequelize实例
const sequelize = new Sequelize(
    'my_db-01',
    'root',
    '123456',
    {
    //所在ip
    'host':'127.0.0.1',
    //端口
    'port':3306,
    'dialect':'mysql',
    'define':{
        'underscored':true
    }
    
})
sequelize.authenticate().then(() =>{
    console.log('连接成功');
})
.catch(err =>{
    console.log('连接出错')
})
const tag = tagmodel(Sequelize,sequelize)
const articletag = articletagmodel(Sequelize,sequelize)
const user = usermodel(Sequelize,sequelize)
const articles = articlemodel(Sequelize,sequelize)
const articlecate = articlecatemodel(Sequelize,sequelize)

//联表关系
//1.一篇文章对应一个分类
articlecate.hasMany(articles,{
    foreignKey:'cate_id'
})
// 2.一个分类对于多篇文章
articles.belongsTo(articlecate,{
    foreignKey:'cate_id'
})
//文章与作者的关系
user.hasMany(articles,{
    foreignKey:'author_id'
})
articles.belongsTo(user,{
    foreignKey:'author_id'
})

//tag 和 article 多对多关系
articles.belongsToMany(tag,{through:{
    model:articletag
},
foreignKey:'articleid'
})
tag.belongsToMany(articles,{
    through:{
        model:articletag
    },
    foreignKey:'tagid'
})
sequelize.sync()
module.exports = {
    tag,
    articletag,
    user,
    articles,
    articlecate
}