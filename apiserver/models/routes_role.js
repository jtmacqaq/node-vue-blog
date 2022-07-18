

module.exports = (DataTypes,sequelize) =>{
    const routes_role = sequelize.define('routes_role',{
        id:{
            field: 'id', //字段名
            primaryKey:true,
            type:DataTypes.INTEGER(11),
            allowNull:false,
            autoIncrement:true
    
        },
        roleid:{
            field:'roleid',
            type:DataTypes.STRING(255)
    
        },
        routesid:{
            field:'routesid',
            type:DataTypes.INTEGER(11)
        }
    },
    {
        tableName: 'routes_role',//表名字
        timestamps: false,
        freezeTableName:true
    }
    
    )
    return routes_role
}


