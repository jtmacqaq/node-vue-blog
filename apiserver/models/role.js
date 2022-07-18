module.exports = (DataTypes,sequelize) =>{
    const roles = sequelize.define(
        //表的名称
        'roles',{
            id:{
                field: 'id', //字段名
                primaryKey:true,
                type:DataTypes.INTEGER(11),
                allowNull:false,
                autoIncrement:true
            },
            rolename:{
                field:'rolename',
                allowNull:true,
                type:DataTypes.STRING(255)
            },
        },
        {
            tableName: 'roles',//表名字
            timestamps: false,
            freezeTableName:true
        }
    )
    return roles
}
