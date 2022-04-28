

module.exports =(DataTypes,sequelize) =>{
//建立表models
const articlecate = sequelize.define(
    //表的名称
    'ev_article_cate',{
        id:{
            field: 'id', //字段名
            primaryKey:true,
            type:DataTypes.INTEGER(11),
            allowNull:false,
            autoIncrement:true

        },
        name:{
            field: 'name',
            allowNull:false,
            type:DataTypes.STRING(255)
        },
        alias:{
            field: 'alias',
            type:DataTypes.STRING(255),
            allowNull:false
        },
        is_delete:{
            field: 'is_delete',
            type:DataTypes.TINYINT(1)
        }
    },
    {
        tableName: 'ev_article_cate',//表名字
        timestamps: false,
        freezeTableName:true

    }
)
return articlecate
}