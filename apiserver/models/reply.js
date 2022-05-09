


module.exports = (DataTypes,sequelize) =>{
    const reply = sequelize.define('reply',{
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
        content:{
            field:'content',
            type:DataTypes.STRING(255),
            allowNull:false
        },
        from_uid:{
            field:'from_uid',
            type:DataTypes.INTEGER(11),
            allowNull:false
        },
        parent_id:{
            field:'parent_id',
            type:DataTypes.INTEGER(11),
            allowNull:true
        },
        date:{
            field:'date',
            type:DataTypes.STRING(255),
            allowNull:false
        }
    },
    {
        tableName: 'reply',//表名字
        timestamps: false,
        freezeTableName:true
    })
    return reply
}