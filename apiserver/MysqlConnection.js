const Sequelize = require('sequelize')

//创建sequelize实例
const sequelize = new Sequelize(
    'my_db-01',
    'root',
    '123456',
    {
    //所在ip
    'host':'127.0.0.1',
    //端口
    'port':3306,
    'dialect':'mysql',
    'define':{
        'underscored':true
    }
    
})
sequelize.authenticate().then(() =>{
    console.log('连接成功');
})
.catch(err =>{
    console.log('连接出错')
})

module.exports = sequelize