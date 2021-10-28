const {
    Sequelize,
    Model,
    DataTypes
} = require('sequelize');
const sequelize = new Sequelize('fang', 'root', '123456', {
    dialect: 'mysql'
});
// 创建user模型
class User extends Model {}
// 初始化user
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, {
    sequelize,
    modelName: 'user'
});

// 同步到数据库
sequelize.sync()
    // 创建一条记录
    .then(() => User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    }))
    .then(jane => {
        // 打印记录
        console.log(jane.toJSON());
    });