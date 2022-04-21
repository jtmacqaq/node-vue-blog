module.exports = (Sequelize,sequelize) =>{
    const tags = sequelize.define(
        //表的名称
        'tags',{
            id:{
                field: 'id', //字段名
                primaryKey:true,
                type:Sequelize.INTEGER(11),
                allowNull:false,
                autoIncrement:true
            },
            tagname:{
                field:'tagname',
                allowNull:true,
                type:Sequelize.STRING(255)
            },
        },
        {
            tableName: 'tags',//表名字
            timestamps: false,
            freezeTableName:true
        }
    )
    return tags
}
