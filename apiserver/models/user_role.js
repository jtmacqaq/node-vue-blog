

module.exports = (DataTypes,sequelize) =>{
    const user_role = sequelize.define('user_role',{
        id:{
            field: 'id', //字段名
            primaryKey:true,
            type:DataTypes.INTEGER(11),
            allowNull:false,
            autoIncrement:true
    
        },
        userid:{
            field:'userid',
            type:DataTypes.INTEGER(11)
    
        },
        roleid:{
            field:'roleid',
            type:DataTypes.INTEGER(11)
        }
    },
    {
        tableName: 'user_role',//表名字
        timestamps: false,
        freezeTableName:true
    }
    
    )
    return user_role
}


