

module.exports = (DataTypes,sequelize) =>{
    const users = sequelize.define(
        //表名称
        'ev_users',{
            id: {
                field:'id',  //字段名称
                primaryKey:true,
                type:DataTypes.INTEGER(11),
                allowNull:false,
                autoIncrement:true
    
            },
            username:{
                field:'username',
                type:DataTypes.STRING(255),
                allowNull:false,
            },
            password:{
                field:'password',
                type:DataTypes.STRING(255),
                allowNull:false
            },
            nickname:{
                field:'nickname',
                type:DataTypes.STRING(255),
                allowNull:true
            },
            email:{
                field:'email',
                type:DataTypes.STRING(255),
                allowNull:true
            },
            user_pic:{
                field:'user_pic',
                type:DataTypes.TEXT,
                allowNull:true
            }
        },
        {
            tableName: 'ev_users',//表名字
            timestamps: false,
            freezeTableName:true
        }
    )
    return users
}
