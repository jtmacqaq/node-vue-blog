module.exports = (DataTypes,sequelize) =>{
    const routes = sequelize.define(
        //表的名称
        'route',{
            id:{
                field: 'id', //字段名
                primaryKey:true,
                type:DataTypes.INTEGER(11),
                allowNull:false,
                autoIncrement:true
            },
            navname:{
                field:'navname',
                type:DataTypes.STRING(255)
            },
            name:{
                field:'name',
                allowNull:true,
                type:DataTypes.STRING(255)
            },
            path:{
                field:'path',
                type:DataTypes.STRING(255)
            },
            component:{
                field:'component',
                type:DataTypes.STRING(255)
            },
            meta: { 
                field:'meta',
                type:DataTypes.STRING(255)
             },
             icon:{
                field:'icon',
                type:DataTypes.STRING(255)
             },
             redirect:{
                 field:'redirect',
                 type:DataTypes.STRING(255) 
             },
             parentid:{
                 field:'parentid',
                 type:DataTypes.INTEGER(11)
             }
        },
        {
            tableName: 'route',//表名字
            timestamps: false,
            freezeTableName:true
        }
    )
    return routes
}
