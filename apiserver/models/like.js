

module.exports = (DataTypes,sequelize) =>{
    const like = sequelize.define('like',{
        id:{
            field: 'id', //字段名
            primaryKey:true,
            type:DataTypes.INTEGER(11),
            allowNull:false,
            autoIncrement:true
        },
        post_id:{
            field:'post_id',
            type:DataTypes.INTEGER(11),
            allowNull:false
        },
        from_uid:{
            field:'from_uid',
            type:DataTypes.INTEGER(11),
            allowNull:false
        },
        is_like:{
            field:'is_like',
            type:DataTypes.TINYINT(1)
        },
        date:{
            field:'date',
            type:DataTypes.STRING(255),
            allowNull:false
        }
    },
    {
        tableName: 'like',//表名字
        timestamps: false,
        freezeTableName:true
    })
    return like
}