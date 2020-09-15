const Sequelize = require("sequelize");
const mysqlConfig = require("../config");

const sequelize = new Sequelize(mysqlConfig);

const Model = Sequelize.Model;

class User extends Model {}
class Advice extends Model {}

User.init(
  {
    // 属性
    id: {
      type: Sequelize.INTEGER, // 要与数据库声明的类型匹配
      autoIncrementIdentity: true, // 自增
      primaryKey: true, // 主键
    },
    openid: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "user",
    // 参数
  }
);
Advice.init(
  {
    // 属性
    id: {
      type: Sequelize.INTEGER,
      autoIncrementIdentity: true,
      primaryKey: true,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        // 外键声明
        model: "user",
        key: "id",
      },
    },
    createTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "advice",
    // 参数
  }
);
module.exports = {
  User,
  Advice,
};
