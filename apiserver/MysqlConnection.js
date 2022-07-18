const Sequelize = require('sequelize')
const tagmodel = require('./models/tag')
const articletagmodel = require('./models/article_tag')
const usermodel = require('./models/user')
const articlemodel = require('./models/articles')
const articlecatemodel = require('./models/articlecate')
const commentsmodel = require('./models/comments')
const replymodel = require('./models/reply')
const likemodel = require('./models/like')
const rolesmodel = require('./models/role')
const routesmodel = require('./models/routes')
const routesrolemodel = require('./models/routes_role')
const user_role_model = require('./models/user_role')
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
const comments = commentsmodel(Sequelize,sequelize)
const reply = replymodel(Sequelize,sequelize)
const like = likemodel(Sequelize,sequelize)
const role = rolesmodel(Sequelize,sequelize)
const route = routesmodel(Sequelize,sequelize)
const routes_role = routesrolemodel(Sequelize,sequelize)
const user_role = user_role_model(Sequelize,sequelize)

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
//评论和文章的关系
articles.hasMany(comments,{
    foreignKey:'post_id'
})
comments.belongsTo(articles,{
    foreignKey:'post_id'
})
//tag 和 article 多对多关系
articles.belongsToMany(tag,{through:{
    model:articletag
},
foreignKey:'articleid'
})
//user和评论的关系
user.hasMany(comments,{
    foreignKey:'from_uid'
})
comments.belongsTo(user,{
    foreignKey:'from_uid'
})
tag.belongsToMany(articles,{
    through:{
        model:articletag
    },
    foreignKey:'tagid'
})
//评论和回复的关系
comments.hasMany(reply,{
    foreignKey:'parent_id'
})
reply.belongsTo(comments,{
    foreignKey:'parent_id'
})

//用户和角色的关系
user.belongsToMany(role,{
    through:{
        model:user_role
    },
    foreignKey:'userid'
})
role.belongsToMany(user,{
    through:{
        model:user_role
    },
    foreignKey:'roleid'
})

//角色和路由多对多的关系
role.belongsToMany(route,{
    through:{
        model:routes_role
    },
    foreignKey:'roleid'
})
route.belongsToMany(role,{
    through:{
        model:routes_role
    },
    foreignKey:'routesid'
})
// //文章和点赞的关系
// articles.hasMany(like,{
//     foreignKey:'post_id'
// })
// like.belongsTo(articles,{
//     foreignKey:'post_id'
// })
sequelize.sync()
module.exports = {
    tag,
    articletag,
    user,
    articles,
    articlecate,
    comments,
    reply,
    like,
    role,
    route,
    routes_role,
    user_role
}