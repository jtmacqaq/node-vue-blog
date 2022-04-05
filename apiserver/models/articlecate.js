const sequelize = require('../MysqlConnection')
const  Sequelize = require('sequelize')

//建立表models
const articlecate = sequelize.define(
    //表的名称
    'ev_article_cate',{
        id:{
            field: 'id', //字段名
            primaryKey:true,
            type:Sequelize.INTEGER(11),
            allowNull:false,
            autoIncrement:true

        },
        name:{
            field: 'name',
            allowNull:false,
            type:Sequelize.STRING(255)
        },
        alias:{
            field: 'alias',
            type:Sequelize.STRING(255),
            allowNull:false
        },
        is_delete:{
            field: 'is_delete',
            type:Sequelize.TINYINT(1)
        }
    },
    {
        tableName: 'ev_article_cate',//表名字
        timestamps: false,
        freezeTableName:true

    }
)
articlecate.sync()
module.exports = articlecate