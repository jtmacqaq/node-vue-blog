const sequelize = require('../MysqlConnection')
const  Sequelize = require('sequelize')

const article = sequelize.define(
    //表的名称
    'ev_article',{
        id:{
            field: 'id', //字段名
            primaryKey:true,
            type:Sequelize.INTEGER(11),
            allowNull:false,
            autoIncrement:true
        },
        title:{
            field:'title',
            allowNull:false,
            type:Sequelize.STRING(255)
        },
        content:{
            field:'content',
            allowNull:false,
            type:Sequelize.TEXT

        },
        cover_img:{
            field:'cover_img',
            allowNull:false,
            type:Sequelize.STRING(255)

        },
        pub_date:{
            field:'pub_date',
            allowNull:false,
            type:Sequelize.STRING(255)
        },
        state:{
            field:'state',
            allowNull:false,
            type:Sequelize.STRING(255)
        },
        cate_id:{
            field:'cate_id',
            allowNull:false,
            type:Sequelize.INTEGER(11)
        },
        author_id:{
            field:'author_id',
            allowNull:false,
            type:Sequelize.INTEGER(11)
        },
    },
    {
        tableName: 'ev_article',//表名字
        timestamps: false,
        freezeTableName:true
    }
)
article.sync()
module.exports = article