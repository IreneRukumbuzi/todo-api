const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: "ownerId",
        as: "Owner",
      });
    }
  }
  Todo.init(
    {
      item: DataTypes.STRING,
      isCompleted: DataTypes.BOOLEAN,
      ownerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
