const sequelize = require('../MysqlConnection')
const  Sequelize = require('sequelize')

const users = sequelize.define(
    //表名称
    'ev_users',{
        id: {
            field:'id',  //字段名称
            primaryKey:true,
            type:Sequelize.INTEGER(11),
            allowNull:false,
            autoIncrement:true

        },
        username:{
            field:'username',
            type:Sequelize.STRING(255),
            allowNull:false,
        },
        password:{
            field:'password',
            type:Sequelize.STRING(255),
            allowNull:false
        },
        nickname:{
            field:'nickname',
            type:Sequelize.STRING(255),
            allowNull:true
        },
        email:{
            field:'email',
            type:Sequelize.STRING(255),
            allowNull:true
        },
        user_pic:{
            field:'user_pic',
            type:Sequelize.TEXT,
            allowNull:true
        }
    },
    {
        tableName: 'ev_users',//表名字
        timestamps: false,
        freezeTableName:true
    }
)
users.sync()
module.exports = users