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
      type: Sequelize.INTEGER,
      autoIncrementIdentity: true,
      primaryKey: true,
    },
    wxId: {
      type: Sequelize.STRING,
      allowNull: true,
    }
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
    content:{
      type: Sequelize.TEXT,
      allowNull: true
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "user",
        key: "id",
      }
    }
  },
  {
    sequelize,
    modelName: "advice",
    // 参数
  }
)
module.exports = {
  User,
  Advice,
};
