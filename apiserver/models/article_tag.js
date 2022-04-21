

module.exports = (DataTypes,sequelize) =>{
    const articletag = sequelize.define('article_tag',{
        id:{
            field: 'id', //字段名
            primaryKey:true,
            type:DataTypes.INTEGER(11),
            allowNull:false,
            autoIncrement:true
    
        },
        tagid:{
            field:'tagid',
            type:DataTypes.INTEGER(11),
    
        },
        articleid:{
            field:'articleid',
            type:DataTypes.INTEGER(11)
        }
    },
    {
        tableName: 'article_tag',//表名字
        timestamps: false,
        freezeTableName:true
    }
    
    )
    return articletag
}


